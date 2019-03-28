const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('Listar GET - /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=0'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar GET - /herois - Deve retornar somente 3 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar GET - /herois - Deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEwE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }

        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(dados, errorResult)
    })

    it('Listar GET - /herois - Deve filtrar um item', async () => {
        const NAME = 'Homem Aranha-1553616093464'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('Cadastrar POST - /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })
        
        const statusCode = result.statusCode
        const { message } = JSON.parse(result.payload)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
        assert.notStrictEqual(_id, undefined)
        assert.ok(statusCode === 200)
   })
})