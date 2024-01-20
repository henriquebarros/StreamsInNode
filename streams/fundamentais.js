//
//process.stdin
//        .pipe(process.stdout)
//EXEMPLO DE STREAM DE LEITURA

import { Readable, Writable, Transform } from 'node:stream';

//STREAM DE LEITURA - Readable
class OneToHundredStream extends Readable {
    index = 1
    _read(){
        const i = this.index++;

        setTimeout(()=>{
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)


    }
}


//STREAM DE TRANSFOMAÇÃO Transform (usada para comunicação entre stream, alterando os dados)
class InverseNumberStream extends Transform{
    _transform(chuck, encoding, callback){
        const transformed = Number(chuck.toString()) * -1

        callback(null,Buffer.from(String(transformed)) )
    }
}

//STREAM DE ESCRITA - Writable
class MultiplayByTenStream extends Writable {
    _write(chuck, encoding, callback){
        console.log(Number(chuck.toString()) * 10)
        callback()
    }
}




new OneToHundredStream()
        .pipe(new InverseNumberStream())
        .pipe(new MultiplayByTenStream())