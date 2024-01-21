//const http = require('http')
import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

//formas em que frontend envia informações
//Query Parameters: URL Stateful =>  utilizados para filtros, paginação, não obrigatórios.... não recomendados para dados sensíveis
// Route Parameters: geralmente para Identificação de recursos 
// Request Body: Comumente usado para Envio de informações de um formulário


const server = http.createServer(async (req,res)=>{
    const { method, url } = req;

    await json(req, res)


    const route =  routes.find(route => {
        return route.method === method && route.path.test(url)
    })


    if(route){
        const routeParams = url.match(route.path)

        const params = {...routeParams.groups}

        req.params = params

        
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


