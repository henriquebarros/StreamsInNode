
import { randomUUID } from 'node:crypto'
//UUID   =>  UUID (Identificador Único Universal) é um padrão para identificadores únicos que são globalmente únicos. Esses identificadores são strings de 128 bits (geralmente representados como 32 caracteres hexadecimais divididos em grupos separados por hifens)
import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from "./database.js";
const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            console.log(req.query)
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },

    {
        method: 'POST',
        path: buildRoutePath('/users'),
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
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req,res) =>{
            const {id} = req.params;
            const {name, email} = req.body;
            database.update('users',id, {
                name,
                email
            })
            //http cod: 204 status de sucesso na requisição, sem conteudo a ser retornado
            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req,res) =>{
            const {id} = req.params;

            database.delete('users',id)
            //http cod: 204 status de sucesso na requisição, sem conteudo a ser retornado
            return res.writeHead(204).end()
        }
    }
]