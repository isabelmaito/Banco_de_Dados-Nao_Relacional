import { ObjectId } from 'mongodb'

export const getMunicipiosById = async(req, res) => {
    try{
        const {id} = req.params
        const db = req.app.locals.db
        const municipio = await db.collection('municipios').findOne({_id: id})
        if(!municipio){
            return res.status(500).json({ error: true, message: 'Internal Server Error'})
            console.error('Error getting municipio by id', error)
        }
    }
}