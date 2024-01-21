//const http = require('http')
import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js';
import { json } from './middlewares/json.js';

//UUID   =>  UUID (Identificador Único Universal) é um padrão para identificadores únicos que são globalmente únicos. Esses identificadores são strings de 128 bits (geralmente representados como 32 caracteres hexadecimais divididos em grupos separados por hifens)

const database = new Database()


database.database

const server = http.createServer(async (req,res)=>{
    const { method, url } = req;

    await json(req, res)


    if(method==='GET' && url==='/users'){
        const users = database.select('users')

        return res.end(JSON.stringify(users))
    }

    if(method==='POST' && url==='/users'){
        const { name, email } = req.body;
        const user = {
            id:randomUUID(),
            name,
            email
        }
        database.insert('users', user)

        return res.writeHead(201).end();
    }

    return res.writeHead(404)
})


server.listen(3333)

// PADRÕES DE IMPORTAÇÃO
/*
    CommonJS => require (default)
    ESModules => import/export  ("type":"module", alterar no packge.json)

*/


