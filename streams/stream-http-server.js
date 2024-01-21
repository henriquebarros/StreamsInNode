import http from 'node:http'
import { Transform } from 'node:stream'


//STREAM DE TRANSFOMAÇÃO Transform (usada para comunicação entre stream, alterando os dados)
class InverseNumberStream extends Transform{
    _transform(chuck, encoding, callback){
        const transformed = Number(chuck.toString()) * -1
        console.log(transformed)
        callback(null,Buffer.from(String(transformed)) )
    }
}


//OBSERVAÇÃO O request  e response, são respectivamente setreams ReadableStream (leitura) e WritableStream (escrita)
const server = http.createServer(async (req,res)=>{
    const buffers = [];
    
    //percorre e carrega todos os dados da stream no buffers antes de prosseguir, funcional para situações em que é necessário carregar todos os dados
    for await ( const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent);

    return res.end(fullStreamContent)

})


server.listen(3334)