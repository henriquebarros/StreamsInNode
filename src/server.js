//const http = require('http')
import http from 'node:http'


const users = []


const server = http.createServer(async (req,res)=>{
    const { method, url } = req;
    const buffers = [];
    
    //percorre e carrega todos os dados da stream no buffers antes de prosseguir, funcional para situações em que é necessário carregar todos os dados
    for await ( const chunk of req) {
        buffers.push(chunk)
    }
    
    try {
        req.body = JSON.parse( Buffer.concat(buffers).toString() )
    } catch {
        req.body = null
    }
    



    if(method==='GET' && url==='/users'){
        return res.
               setHeader('Content-type', 'application/json').    
               end(JSON.stringify(users))
    }

    if(method==='POST' && url==='/users'){
        const { name, email } = req.body;
        
        users.push({
            id:1,
            name,
            email
        })
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


