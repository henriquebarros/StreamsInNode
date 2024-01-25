export function buildRoutePath(path){
    //path ex.: /users/:id => /^\/users\/(?<id>[a-z0-9-_]+)/
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?`)

    return pathRegex
}

    /** tem por objetivo formatar o path 'exp.: /users/:id' em /users/, retornar o array abaixo, para localizar e definir os routes paramenters da requisição, 
     * neste caso o indice 1 do array 
     * nessa parte da regex ?<$1> (retorno da posição 1) é definido em groups, os routes paraments e seus valores
     * [
        '/users/245891f7-1720-41fa-9c84-4eeb95f17f0b',
        '245891f7-1720-41fa-9c84-4eeb95f17f0b',
        index: 0,
        input: '/users/245891f7-1720-41fa-9c84-4eeb95f17f0b',
        groups: [Object: null prototype] {
            id: '245891f7-1720-41fa-9c84-4eeb95f17f0b'
        }
        ]

        a inclusão de ?<query>)? para definir os query paraments, 
        observação: o ultimo ponto de interrogação define que pode ou não conter a query; 
        o $ define que o final da url não pode conter nada além dessa verificação;
        .* define qualquer caracter e inúmeras vezes

     */