//tipo de dados Buffer em Node.js, aplicando na prática esse conceito.


/**
 * O Buffer é uma classe em Node.js que fornece um meio de lidar com dados binários diretamente. Ele é útil quando você precisa trabalhar com dados brutos, como manipulação de arquivos binários, leitura de sockets ou manipulação de dados em formato binário.
 * Aqui está um exemplo básico de como você pode criar um Buffer em Node.js:
 */


var buf = Buffer.from("ok")

//Buffer metodo nativo do node que representa a forma como salva os dados em memória
console.log(buf) //return <Buffer 6f 6b> Cada hexadecimal após o Buffer corresponde a um caracter da palavra

//exemplo básico de como você pode criar um Buffer em Node.js:
// Criando um Buffer com uma string
buf = Buffer.from('Hello, World!', 'utf-8');

// Exibindo o conteúdo do Buffer
console.log(buf); // <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>


// Criando um Buffer com tamanho específico
buf = Buffer.alloc(10);

// Preenchendo o Buffer
buf.write('Hello');

// Exibindo o conteúdo do Buffer
console.log(buf); // <Buffer 48 65 6c 6c 6f 00 00 00 00 00>


//retornar o número em decimal
buf = Buffer.from("hello")

console.log(buf.toJSON())