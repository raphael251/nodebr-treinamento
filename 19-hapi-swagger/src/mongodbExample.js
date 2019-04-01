const Mongoose = require('mongoose')
Mongoose.connect('mongodb://raphaelpassos:underthebridge@localhost:27017/herois', {
    useNewUrlParser: true
}, function (error) {
    if (!error) return;
    console.log('Falha na conexao', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!'))
// setTimeout(() => {
//     const state = connection.readyState
//     console.log('state', state)
// }, 1000);

// readyState e o significado dos códigos:
// 0: desconectado
// 1: conectado
// 2: conectando
// 3: desconectando

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItems = await model.find()
    console.log('items', listItems)
}

main()