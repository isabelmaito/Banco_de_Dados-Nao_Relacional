use('estoque')
const usuarios = [{nome: 'José', idade: 22, sexo: 'M', 
    hobbies:['surf', 'animes']},
    {nome: 'Maria', idade: 24, sexo:'F',
        hobbies:['Judô', 'Volley']}
]
db.usuarios.insertMany(usuarios)

use('estoque')
db.usuarios.find()

use('estoque')
db.usuarios.updateOne({nome: {$eq: 'Maria'}},
    {$set: {nome: 'Maria Silva'}}
)

//Para incrementar ou decrementar um valor na alteração
use('estoque')
db.usuarios.updateMany({}, //todos pois está vazio
    {$inc: {idade: +1}}
)

//$push - Adiciona um novo elemento a um array
use('estoque')
db.usuarios.updateOne({nome:'José'},
    {$set: {hobbies: 'Fotografia'}}
)

use('estoque')
db.usuarios.updateOne({nome: 'José'},
    {$set: {hobbies: 'Fotografia'}}
)

//$pull - Remove o elemento do array 
use('estoque')
db.usuarios.updateOne({sexo: {$eq: 'F'}},
    {$pull: {hobies: 'Judô'}}
)