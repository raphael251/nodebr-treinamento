function getMovie() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 01,
                name: 'John Wick'
            });
        }, 1000);
    })
}

function getAuthor(movieId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                name: 'Derek Kolstad'
            })
        }, 2000);
    })
}

function getProtagonist(movieId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                name: 'Keanu Reeves'
            })
        }, 2000);
    })
}

main()
async function main() {
    try {
        console.time('time-test')

        const movie = await getMovie();
        // const movieAuthor = await getAuthor(movie.id);
        // const movieProtagonist = await getProtagonist(movie.id);
        const resultado = await Promise.all([
            getAuthor(movie.id),
            getProtagonist(movie.id)
        ])

        const movieAuthor = resultado[0];
        const movieProtagonist = resultado[1];

        console.log(`
            Movie Name: ${movie.name},
            Movie Author: ${movieAuthor.name},
            Movie Protagonist: ${movieProtagonist.name}
        `);

        console.timeEnd('time-test')
    }
    catch (error) {
        console.error('ERRO!', error)
    }
}