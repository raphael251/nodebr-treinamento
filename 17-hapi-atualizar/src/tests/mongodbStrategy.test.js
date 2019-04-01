const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroiSchema')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super Teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}
let MOCK_HEROI_ID

let context = {}

describe('MongoDB suíte de testes', function () {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))
        
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('Verificar conexao', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })
    it('Cadastrar', async () => {
        const {
            nome,
            poder
        } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({
            nome,
            poder
        }, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [{
            nome,
            poder
        }] = await context.read({
            nome: MOCK_HEROI_DEFAULT.nome
        })
        const result = {
            nome,
            poder
        }

        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, { nome: 'Perna Longa'})
        
        assert.deepEqual(result.nModified, 1)
    })

    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)

        assert.deepEqual(result.n, 1)
    })
})