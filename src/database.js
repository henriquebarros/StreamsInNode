import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)



export class Database {
    #database = {}
    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data=>{
                this.#database = JSON.parse(data)
            })
            .catch(()=>{//retorna objeto vazio
                this.#persist()
            })
    }

    //método para salvar e dados em aruivos
    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    
    select(table){
        const data = this.#database[table] ?? []

        return data;
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data;
    }

}

/**
 * No Node.js, o uso de um símbolo "#" (conhecido como hash ou cerquilha) 
 * antes de uma variável dentro de uma classe é uma convenção introduzida no 
 * ECMAScript 2019 (também conhecido como ES10) para indicar que a variável é privada.
 * 
 * Antes dessa adição, as variáveis dentro de uma classe eram consideradas públicas por padrão. 
 * A introdução do "#" permite aos desenvolvedores sinalizar que uma variável deve ser tratada como privada, 
 * o que significa que ela não deve ser acessada diretamente de fora da classe.
 */














/**
 * Como nessa aplicação não vamos trabalhar com banco de dados "reais" (PostgreSQL, MySQL, Mongo e etc), a solução mais simples para persistir os dados são arquivos, especificamente arquivos JSON.
 * 
 */
