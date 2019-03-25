const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v 1.0')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "Id do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-l, --listar', "Listar um Herói")
        .option('-r, --remover', "Remover um Herói pelo id")
        .option('-a, --atualizar [value]', "Atualizar um Herói pelo id")
        .parse(process.argv)
    const heroi = new Heroi(Commander)
    try {
        if (Commander.cadastrar) {
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Herói não foi cadastrado!')
                return;
            }
            console.log('Herói cadastrado com sucesso!')
            return;
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error('Não foi possível remover Herói.')
            }
            console.log('Heroi removido com sucesso!')
            return;
        }
        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if (!resultado) {
                console.error('Não foi possível atualizar o Herói')
                return;
            }
            console.log('Herói atualizado com sucesso!')
            return;
        }
    } catch (error) {
        console.error('DEU RUIM', error)        
    }
}

main()