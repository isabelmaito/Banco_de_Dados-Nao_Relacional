import express from 'express'
import { getMunicipiosById , createMunicipio} from '../controllers/municipios.js'
import { validateMunicipio, validadeteMunicipio, validadetObjectId } from '../middlewares/validations.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)

//POST criar um novo municipio
router.post('/',validateMunicipio, createMunicipio)

export default router