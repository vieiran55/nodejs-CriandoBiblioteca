const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros(erro) {
  throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
  try {
    //promisses async await
    const arrayStatus = await Promise
      .all(arrayURLs
        .map(async url => {
          const res = await fetch(url)
          return res.status;
    }))
    return arrayStatus;
  } catch(erro) {
    manejaErros(erro);
  }
}


// esta função como o proprio nome ja falam, vai gerar o array de URLS
function geraArrayDeURLs(arrayLinks) {
  // loop para cada {chave: valor}
  // objeto -> [var]
  //Object.values(objeto)

  // lembrando que o .map vai executar uma função em cada elemento do array
  // o .map precisa de função callback
  // aqui falamos para o map utilizar o Object.values em cada loop os links em 1 array
  // o Object.values vai retornar os valores em array, ou seja, o resultado será array de arrays. Para resolver isso vamos utilizar o .join para concatenar os elementos, ele vai tirar os elementos do arrray e colocar em string.
  return arrayLinks
    .map(objetoLink => Object
      .values(objetoLink).join());
}


// aqui vamos criar uma função para criar um array de links.
async function validaURLs(arrayLinks) {
  const links = geraArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);

  const resultados = arrayLinks.map((objeto, indice) => ({
    ...objeto,
    status: statusLinks[indice]
  }))
  return resultados;
}

module.exports = validaURLs;