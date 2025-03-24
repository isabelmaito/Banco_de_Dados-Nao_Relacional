//Tipo de Dados
//String, Number (int ou decimal), Boolean (V ou F), Date, ObjectID
//Array, Object
use('estoque')
db.categorias.insertOne({nome:'Bebidas',
    ativo:true})

//Exemplo de select From categorias
use('estoque')
db.categorias.find()
 
use('estoque')
db.categorias.insertOne({_id:'123',
    nome:'Sobremesa',
    ativo:true})
 
//primeiro{filtro}, segundo{coluna}
use('estoque')
db.categorias.find({}, {_id:1, nome:1})
 
use('estoque')
db.categorias.insertMany([
    {nome:'Entradas', ativo:true},
    {nome:'Pães', ativo:false}
])

//Exercicio em aula
use('estoque')
db.produtos.insertOne({
    _id: '124',
    nome: 'Hambúrguer Gourmet',
    preco: 35.99,
    ingredientes: ["pão", "carne", "queijo",
        "alface", "tomate"],
    vegetariano: false,
    dataCadastro: new Date(),
    calorias: {
        total:780,
        porcoes: 1
    }
})

use('estoque')
db.produtos.find()
 
use('estoque')
db.produtos.insertOne({abobrinha:"tem"})
 
use('estoque')
db.produtos.drop()
 
use('estoque')
db.createCollection('produtos',
    {
        validator: {
            $jsonSchema: {
                'bsonType':'object',
                'required':['_id','nome','preco',
                'ingredientes', 'vegetariano',
                'dataCadastro']
        }
    }
})

//Obter as informações da collection
use('estoque')        
db.getCollectionInfos({name:'produtos'})
 
use('estoque')
    try{
    db.produtos.insertOne({abobrinha:"tem"})
}catch(err){
    printjson(err)
}

//Volta do intervalo
use('estoque')
db.estados.insertMany([
    {sigla: 'SP', nome:'São Paulo',
        populacao: 12000000},
    {sigla: 'AC', nome:'Acre',
        populacao: 712000},
    {sigla: 'RJ', nome: 'Rio de Janeiro',
        populacao: 2500000
    }        
])

use('estoque')
db.estados.find({}, //filtros
                {} //atributos a serem exibidos
)

use('estoque')
db.estados.find({sigla: {$eq: 'SP'}},{nome:1})

use('estoque')
//select id, nome from estados where sigla = 'SP'
db.estados.find({sigla: {$eq: 'SP'}},{_id:0, nome:1})

use('estoque')
//i = insensitive case
//$ = que termine
//^ = que inicie
db.estados.find({nome: /paulo/i},{_id:0, nome:1})

use('estoque')
//select * from estados where população >=11000000
db.estados.find({populacao: {$gte: 11000000}})

//select * from estados where sigla in ('AC','RJ')
use('estoque')
db.estados.find({sigla: {$in: ['AC','RJ']}})

//select * from estados where sigla = 'RJ' OR sigla = 'AC'
use('estoque')
db.estados.find({
    $or: [
        {sigla: {$eq: 'RJ'}},
        {Sigla: {$eq: 'AC'}}
    ]
},{_id:0, sigla:1, nome:1})

//delete
use('estoque')
db.estados.deleteOne({sigla: 'AC'}) //deleteOne exclui um 
db.estados.deleteOne({sigla: {$eq:'AC'}}) //igual ao de cima

use('estoque')
db.estados.deleteMany({bnome: /o/i}) //deleteMany exclui vários

//update 
use('estoque')
db.estados.updateOne({sigla: {$eq: 'AC'}},
    {$set: {populacao: 1000}}
)

use('estoque')
db.estoque.find({sigla: 'AC'})


