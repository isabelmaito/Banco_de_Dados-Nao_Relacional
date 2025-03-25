import express from 'express'
import { connectToDatabase } from './config/db.js'
import municipiosRoutes from './api/routes/municipios.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) //parse do JSON

//rota publica
app.use('/', express.static('public'))

//api routes
app.use('/api/municipios', municipiosRoutes)

//define o favicon
app.use('/favicon.ico', express.static('public/images/logo.png'))

connectToDatabase(app)
    .then(()=>{
        app.listen(PORT, () => {
            console.log('Server running on port ${PORT}')
        })
    })
    .catch((error) => {
        console.error('Error starting')
    })
