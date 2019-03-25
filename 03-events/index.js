const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, (click) => {
    console.log('usuario clicou', click)
})

const stdin = process.openStdin()
stdin.addListener('data', (value) => {
    console.log(`Você digitou: ${value.toString().trim()}`)
})



// meuEmissor.emit(nomeEvento, 'na barra de buscas')
// meuEmissor.emit(nomeEvento, 'no menu')

// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'em algum lugar')
// }, 1000);

