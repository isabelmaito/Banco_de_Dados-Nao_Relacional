import express from 'express'
import { getMunicipiosById } from '../controllers/municipios'
import municipiosRoutes from './routes/municipios.js'

const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)

export default router