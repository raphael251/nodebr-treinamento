const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    obterPessoas
}

//teste de funcionamento
// obterPessoas('r2')
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.error('Deu bosta!', error)
//     })