
import { randomUUID } from 'node:crypto'
//UUID   =>  UUID (Identificador Único Universal) é um padrão para identificadores únicos que são globalmente únicos. Esses identificadores são strings de 128 bits (geralmente representados como 32 caracteres hexadecimais divididos em grupos separados por hifens)

import { Database } from "./database.js";
const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },

    {
        method: 'POST',
        path: '/users',
        handler: (req,res) => {
            const { name, email } = req.body;
            const user = {
                id:randomUUID(),
                name,
                email
            }
            database.insert('users', user)
    
            return res.writeHead(201).end();            
        }
    },
    {
        method: 'DELETE',
        path: '/users/:id',
        handler: (req,res) =>{
            return res.end()
        }
    }
]