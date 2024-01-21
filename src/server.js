//const http = require('http')
import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


const server = http.createServer(async (req,res)=>{
    const { method, url } = req;

    await json(req, res)


    const route =  routes.find(route => {
        return route.method === method && route.path === url
    })


    if(route){
        return route.handler(req, res)
    }

    console.log(route)

    return res.writeHead(404).end()
})


server.listen(3333)

// PADRÕES DE IMPORTAÇÃO
/*
    CommonJS => require (default)
    ESModules => import/export  ("type":"module", alterar no packge.json)

*/


