// chalk utilizarenis para marcar o texto
const chalk = require('chalk');
// fs utilizaremos para chamar um arquivo no computador, não precisa ser instalado via npm
const fs = require('fs');
//aqui declaramos e importamos a biblioteca que iremos utilizar

// aqui criamos uma função de regex, que vai extrair do texto as ocorrencias de [], (), https e tex
function extraiLinks(texto){
  // podemos utilizar o site REGEX101.com para testar combinações
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;
  //criamos uma array vazio para após executar a função salvarmos o que foi extraido pelo regex
  const arrayResultados = [];
  let temp;
  //criamos aqui um laço de repetição para varrer o texto e retirar o que foi selecionado pelo regex
  while((temp = regex.exec(texto)) !== null) {
    //aqui será retirado pelo indice
    //utilizando o metodo .push para fazer um novo array
    arrayResultados.push({ [temp [1]]: temp[2]})
  }
  // aqui criamos uma condicional para verificar se vai haver algum item no array
 return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}


//aqui vamos criar uma função para nos informar qual é o erro
function trataErro(erro) {
  //utilizamos throw que significa jogar pra fora, new é uma propriedade do node que significa novo, Error tambem é uma propriedade do node que significa Error
  throw new Error(chalk.red(erro.code, 'não há arquivo valido no caminho'));
}

// olha javascript dentro dessa função vai ter codigo async
async function pegaArquivo(caminhoDoArquivo){
  const encoding = 'utf-8';
  // aqui configuramos o erro, é bem similar ao if, no caso utilizaremos os try. isso significa q o js vai try(tentar) executar oq esta declarado, se não conseguir ele catch(pega) o erro. o termo finally sempre será executado, é uma boa pratica utiliza-lo para encerrar o programa.
  try {
  // olha temos um await dentro do rsultado
  const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    //passamos aqui a função do regex para jogar na tela
  return (extraiLinks(texto))
  } catch (erro){
    trataErro(erro)
  } finally {
    console.log(chalk.yellow('operação concluída'));
  }
}


// // temos outras formas de declarar essa função, aqui faremos utilizando as propriedades do fs.promisses
// function pegaArquivo(caminhoDoArquivo){
//   const encoding = 'utf-8'
//   fs.promises
//   .readFile(caminhoDoArquivo, encoding)
//   .then((texto) => chalk.green(console.log(texto)))
//   .catch((erro) => trataErro(erro))
//   // aqui ele ira atras do arquivo
//   // então o aquivo esta pronto? então joguem em texto
//   // não está prnto? pegue esse erro e faça uma função callback e jogue em erro
  
// }

// // precisamos obedecer os parametros estabelicos pelo fs para executar corretamente
// // declaramos uma função de string para pegar o caminho do arquivo
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8'
//   //aqui separamos ele em 3 partes, o primeiro é o caminho do arquivo, o segundo é o utf e o terceiro é uma callback com 2 parametros: 1 recebe o erro e o 2 recebe o sucesso. Para nao ser necessario inserir o campo de erro, podemos colocar um underline para disfarçar
//   // vamos colocar dentro do atributi de callback o erro que fizemos na função e tanbem a condicional if
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro)
//     }
//     console.log(chalk.green(texto));
//   } )
// }

// aqui declaramos o caminho do arquivo.
//pegaArquivo('./arquivos/texto1.md');

module.exports = pegaArquivo


// inserimos o comando diretamente no package.json para nao ser rechamado todas as vezes  => npm run cli