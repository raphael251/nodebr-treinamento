const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

    for (let index = 0 ; index <= this.length - 1 ; index ++) {
        const item = this[index]
        valorFinal = callback(valorFinal, item, this)
    }
    return valorFinal
}

async function main () {
    try {
        const { results } = await obterPessoas('a')
        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)

        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // })

        const minhaLista = [
            ['Raphael', 'Passos'],
            ['use', 'ViolãoBR']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
            .join(', ')

        console.log('total', total)
    } catch (error) {
        console.error('deu ruim!', error)
    }
}

main()