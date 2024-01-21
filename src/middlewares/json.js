export async function json(req,res) {
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
    

    res.setHeader('Content-type', 'application/json')
}