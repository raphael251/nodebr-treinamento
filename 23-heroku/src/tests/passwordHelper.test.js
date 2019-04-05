const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = 'Raphael@12321'
const HASH = '$2b$04$Jq7pyGgfWmXuQDmPfw7e/exoUftdDprmbdb2rPcq05jb3/Pispuf6'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)

        assert.ok(result.length > 10)
    })
    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        
        assert.ok(result === true)
    })
})