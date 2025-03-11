const{ MongoClient } = require('mongodb')
const fs = require('fs')

const uri='mongodb://localhost:27017'
const dbName = 'estoque'
const collectionName = 'municipios'

async function importaMunicipios(){
    const client = new MongoClient(uri)
    try{
        await client.connect() //conectando ao banco
        console.log('✅Conectado ao MongoDB') //icone clicar em windows e ponto .
        const db = client.db(dbName) //inserir dados no mongodb
        const collection = db.collection(collectionName)
        const findCollection = await db.listCollections({ name: collectionName }).toArray();
        if(findCollection.length > 0){
            await collection.drop();
            console.log('🗑 Coleção anterior apagada')
        }

        const dados = fs.readFileSync('municipios.json','utf-8') //ler arquivo json
        const municipios = JSON.parse(dados)
        
        if(!Array.isArray(municipios)){throw new Error('o JSON deve conter um array de objetos')} //verificar um array
        
        const resultado = await collection.insertMany(municipios)
        console.log(`${resultado.insertedCount} documentos inseridos`)
    
    } catch(error){
        console.error('❌Erro ao importar', error. message)
    }finally{
        await client.close() //fecha a conexão 
    }
}

importaMunicipios();