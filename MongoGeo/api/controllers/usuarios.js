import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const insereUsuario = async(req, res) =>{
    req.body.avatar = `https://ui-avatars.com/api/?name=${req.body.nome.replace}(/ /g, '+'))&background=F00&color=FFF`
    //bcryptjs -> criptografar o conteúdo
    //jsonwebtoken -> para gerar o jwt
    //npm i bcryptjs jsonwebtoken

    //criptografia da senha
    const salt = await bcrypt.genSalt(10) //10 rodadas de processamento de hash
    req.body.senha = await bcrypt.hash(req.body.senha, salt)

    //salvando o usuário
    const db = req.app.locals.db
    await db.collection('usuarios')
        .insertOne(req.body)
        .then(result => res.status(201).send(result)
            .catch(err => Response.status(400).json(err))
        )
}

export const efetuaLogin = async (req,res) => {
    const { email, senha} = req.body
    try{
        const db = req.app.locals.db
        //verificar se o email existe no MongoDB
        let usuario = await db.collection('usuarios').find({email}).limit(1).toArray()
        //se o array estiver vazio, é porque não tem
        if(!usuario.lengt){
            
        }
    }
}