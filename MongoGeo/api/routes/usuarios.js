import express from 'express'
import {efetuaLogin, insereUsuario} from '../controllers/usuarios.js'
import {validateUsuario} from '../middlewares/validations.js'

const router = express.Router()
//cria novo usuário
router.post('/', validateUsuario, insereUsuario)
//valida o login
router.post('/login', efetuaLogin)


export default router

