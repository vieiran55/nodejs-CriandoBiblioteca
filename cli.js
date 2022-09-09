// este arquivo é o "COMAND LINE INTERFACE", basicamente serve para ser rodado pelo usuario para utilizar a biblioteca.

const chalk = require('chalk');
// aqui importamos a função pegaArquivo do index.js
const pegaArquivo = require('./index');

const validaURLs = require('./http-validacao');

// aqui declaramos uma função com a propriedade procces.argv do node que informa o caminho que esta sendo executado
const caminho = process.argv;

//declaramos  uma função com parametro de array
// async = olha javascript vc precisa esperar as coisas acontecerem para finalizar a função
async function processaTexto(caminhoDeArquivo) {
  // aqui damos como parametro o index2 do array caminho
  const resultado = await pegaArquivo(caminhoDeArquivo[2]);
  // aqui vamos criar uma condicional para validar se as urls são validas, passando a função valida urls
  // se o indice 3 do array de caminhos, passados pelo process.argv for igual a validar, então faremos isso
  if (caminho[3] === 'validar') {
    console.log(chalk.yellow('links validados'), await validaURLs(resultado));
  } else {
    console.log(chalk.yellow('lista de links'), resultado);
  }
}

processaTexto(caminho)