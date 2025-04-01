import express from 'express'
import { getMunicipiosById , createMunicipio} from '../controllers/municipios.js'
import { validateMunicipio } from '../middlewares/validations.js'


const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)

//POST criar um novo municipio
router.post('/',validateMunicipio, createMunicipio)

export default router