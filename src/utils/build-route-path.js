export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)
    /** tem por objetivo retornar o array abaixo, para localizar e definir os routes paramenters da requisição, 
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
     */
    return pathRegex
}