const assert = require('assert')
const api = require('./../api')
let app = {}
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1NDMyOTk0OX0.PdbW1hWRK3wFJLtfaCJQkXq7-WbMNjfPRAMldzFWAyY"

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('deve obter um token', async () => { 
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'xuxadasilva',
                password: '123'
            }
        })

        const { statusCode } = result
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})