import express from 'express'
import path from 'path';

interface options {

    port: number,
    public_path?: string,

}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path: string;

    constructor (opciones: options){

        const {port, public_path = 'public'} = opciones;
        this.port = port
        this.public_path = public_path;
    }

    async start (){


        this.app.use(express.static(this.public_path));


        this.app.get('/{*path}', (req, res) => {

           const indexPath = path.join( __dirname + `../../../${this.public_path}/index.html`);
           res.sendFile(indexPath);

        })
        
        this.app.listen(this.port,() => {

            console.log(`the server is running on port ${ this.port }`)

        })

    }

}