import express, { Router } from 'express'
import path from 'path';
import { text } from 'stream/consumers';

interface options {

    port: number,
    routes: Router,
    public_path?: string,

}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor (opciones: options){

        const {port, routes,public_path = 'public'} = opciones;
        this.port = port
        this.public_path = public_path;
        this.routes = routes;
    }

    async start (){


        this.app.use(express.static(this.public_path));
        this.app.use(express.json());

        this.app.use(this.routes);

        this.app.get('/api/todos', (req, res) => {

            res.json([

                {id: 1, text: 'buy milk', createdAt: new Date()},
                {id: 2, text: 'buy chocolate', createdAt: null},
                {id: 3, text: 'buy strawberry', createdAt: new Date()},

            ])
            return;

        }) 

        this.app.get('/{*path}', (req, res) => {

           const indexPath = path.join( __dirname + `../../../${this.public_path}/index.html`);
           res.sendFile(indexPath);

        })
        
        this.app.listen(this.port,() => {

            console.log(`the server is running on port ${ this.port }`)

        })

    }

}