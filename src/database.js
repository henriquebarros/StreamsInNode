import fs from 'node:fs/promises'
import { serialize } from 'node:v8'

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

    //método para salvar e dados em arquivos
    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    
    select(table, search){
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row => {
                //return Object.entries(search) 
                //Ex.: transforma o objeto no seguinte array {name:"Henrique", email: "h@l.com"} => [['name','Henrique'], ['email','h@l.com']]
                return Object.entries(search).some(([key,value])=>{
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })//some retorn um boolean, após percorrer o array e encontrar
            })
            //console.log(search,data)
        }

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

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row=>row.id===id);
        
        if(rowIndex>-1){
            this.#database[table][rowIndex]={ id, ...data }
            this.#persist()
        }

    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row=>row.id===id);
        
        if(rowIndex>-1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }

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
