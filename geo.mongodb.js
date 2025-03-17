use('estoque')
db.estados.find().forEach(function (estado) {
    db.estados.updateOne(
        {_id: estado._id},
        { $set: {
            local: {
                type: 'Point',
                coordinates: [estado.longitude, estado.latitude]
                }
            },        
        $unset: {latitude: "", longitude: ""}
        }
        )
})
use('estoque')
db.estados.find({}, {local:1})

//criando o indice 2dSphere
use('estoque')
db.estados.createIndex({local: '2dsphere'})

//localizando os estados até 200km próximo a Fatec
use('estoque')
db.estados.find({
    local: {
        $near: {
            $geometry: {
                type: 'Point',
                coordinates: [-47.4496159092281, -23.53138370990615] //Fatec
            },
            $maxDistance: 2000000 //em metros - 200km
        }
    }
},{nome: 1, _id: 0})


use('estoque')
db.estados.find({
    local: {
        $geoWithin: {
            $centerSphere: [[-47.4495, -23.5313], 
            2000 / 6378.1] //raio em radianos
        }
    }
},{nome: 1, _id: 0}) //6368.1 é o raio médio da terra em km