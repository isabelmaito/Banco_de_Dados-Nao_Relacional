import { ObjectId } from 'mongodb'

export const getMunicipiosById = async (req, res) => {
    try {
        const { id } = req.params
        const db = req.app.locals.db
        const municipio = await db.collection('municipios').findOne({ _id: ObjectId.createFromHexString(id) })
        if (!municipio) {
            return res.status(404).json({ error: true, message: 'Municipio not found' })
        }
        return res.status(200).json(municipio)

    }
    catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' })
        console.error('Error getting municipio by id', error)
    }
}

export const createMunicipio = async (req, res) => {
    try {
        const { codigo_ibge, nome, capital, codigo_uf, local } = req.body
        const db = req.app.locals.db
        //verificar se já existe um municipio com o IBGE informado
        const existeMunicipio = await db.collection('municipio').findOne({ codigo_ibge })
        console.log(existeMunicipio)
        if (existeMunicipio) {
            return res.status(409).json(({
                error: true,
                message: 'já existe um municipio com o código do IBGE informado'
            }))//409-conflict
        }
        const novoMunicipio = { codigo_ibge, nome, capital, codigo_uf, local }
        const result = await db.collection('municipio').insertOne(novoMunicipio)
        res.status(201).json({ _id: result.insertedId, ...novoMunicipio })//201-created
    } catch (error) {
        console.erros('Error no municipio', error)
        res.status(500).json({ error: true, message: 'Falha no servidor ao inserir o municipio' })
    }
}