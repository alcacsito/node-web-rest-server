import { Request, Response } from "express";
import { todo } from "node:test";


const todos = [

    {id: 1, text: 'buy milk', createdAt: new Date()},
    {id: 2, text: 'buy chocolate', createdAt: null},
    {id: 3, text: 'buy strawberry', createdAt: new Date()},

];

let nextId = 4;

export class TodosController{



    public getTodos = (req:Request, res:Response) => {

        res.json(todos)
        return;

    }

    public getTodosById = (req:Request, res: Response) => {
         
        if(!req.params.id){

            res.status(400).json({error: `id cannot be null`})
            return;

        }

        const id = +req.params.id;

        if (isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'})

        const todo = todos.find(todo => todo.id === id);

        (todo)
         ? res.json( todo )
         : res.status(404).json({error: `TODO whit id ${id} not found`})


    }


    public createTodo = (req: Request, res:Response) => {

        const {text} = req.body;

        if (!text){
           return res.status(400).json({error: 'the text can not be null'})
        }

        const newTodo = {
            id: nextId++,
            text: text,
            createdAt: new Date()
        }

        todos.push(newTodo)

       return res.json( newTodo )
       
    }

    public updateTodo = (req: Request, res:Response) =>{

        if(!req.params.id){

            res.status(400).json({error: `id cannot be null`})
            return;

        }

        const id = +req.params.id;

        if (isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);

        if(!todo)
        {

            return res.status(404).json({error: `TODO whit id ${id} not found`})

        }

        const {text , createdAt} = req.body;


        todo.text = text || todo.text;
        (createdAt === 'null')
           ?  todo.createdAt = null
           : todo.createdAt = new Date(createdAt || todo.createdAt)

        return res.json(todo);

    }

    public deleteTodo = (req: Request, res:Response) =>{

        if(!req.params.id){

            res.status(400).json({error: `id cannot be null`})
            return;

        }

        const id = +req.params.id;

        if (isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);

        if(!todo)
        {

            return res.status(404).json({error: `TODO whit id ${id} not found`})

        }

        todos.splice(todos.indexOf(todo), 1);

        return res.json(todo);

    }

}