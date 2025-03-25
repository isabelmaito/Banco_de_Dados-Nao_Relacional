import express from 'express'
import { getMunicipiosById } from '../controllers/municipios.js'

const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)

export default router