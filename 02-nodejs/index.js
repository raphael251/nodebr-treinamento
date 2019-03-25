function obterUsuario() {

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM NO USUARIO :C'))

            return resolve({
                id: 1,
                nome: 'Bigode',
                dataNascimento: new Date()
            });
        }, 1000);
    });

}

function obterTelefone(userId) {

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '119902',
                ddd: 11
            })
        }, 2000);
    })

}

function obterEndereco(userId, callback) {
    
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                rua: 'dos bobos',
                numero: 0
            });
        }, 2000);
    })

}

 async function main() {
    try {
        console.time('medida-promise')
        
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEndereco(usuario.id);
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])

        const endereco = resultado[1];
        const telefone = resultado[0];

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise')
    }
    catch (error) {
        console.error('DEU RUIM', error)
    }
}

main();

/* const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function (result) {
                return {
                    usuario : {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEndereco(resultado.usuario.id)
        return endereco
            .then(function resolverEndereco(result) {
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco: result
                }
            })
    })
    .then(function (resultado) {
        console.log(`
                Nome: ${resultado.usuario.nome},
                Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
                Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
            `);
    })
    .catch(function (error) {
        console.error('deu ruim', error)
    }) */

/* obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) {
        console.error('deu ruim em usuário');
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.error('deu ruim em telefone');
            return;
        }
        
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if (erro2) {
                console.error('deu ruim em endereco');
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `);
        });
    });
}); */