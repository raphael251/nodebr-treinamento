// docker exec -it 18bd50b8abce \
// mongo -u raphaelpassos -p underthebridge --authenticationDatabase herois

// mostra as databases
//show dbs

// mudando o contexto para uma database
// use herois

// mostrar coleções
// show collections

// inserir
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1997-03-23'
})

db.herois.find()
db.herois.find().pretty()

for (let i = 0; i <= 500; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1997-03-23'
    })
}

db.herois.count()
db.herois.find()
db.herois.find().limit(200).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

//create

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1997-03-23'
})

//read

db.herois.find()
db.herois.find({nome: 'Lanterna Verde'})

//update

db.herois.update({
    _id: ObjectId("5c9536bfc75ae48897edeca8")
},
    { nome: 'Mulher Maravilha' })

db.herois.update({
    _id: ObjectId("5c9536c0c75ae48897edecac")
},
    { $set: { nome: 'Lanterna Verde' } })

//delete

db.herois.remove() // n remove nada sem where
db.herois.remove({}) // remove tudo
 