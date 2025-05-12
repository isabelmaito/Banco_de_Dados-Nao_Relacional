import express from 'express'
import { config } from 'dotenv'
import cors from 'cors' //importa o módulo cors
import { connectToDatabase } from '../config/db.js'
import municipioRoutes from './routes/municipios.js'
import usuariosRoutes from './routes/usuarios.js'

config() //carrega o conteúdo do .env
const app = express()
const PORT = process.env.PORT || 3000
console.log(PORT)

app.use(cors()) //Habilita o CORS Cross-Origin resource sharing
app.use(express.json()) //parse do JSON
//rota pública
app.use('/', express.static('public'))
//Rotas do app
app.use('/api/municipios', municipioRoutes)
app.use('/api/usuarios', usuariosRoutes)
//define o favicon
app.use('/favicon.ico', express.static('public/images/logo.png'))
//start the server
connectToDatabase(app)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro iniciando o servidor', error);
    });