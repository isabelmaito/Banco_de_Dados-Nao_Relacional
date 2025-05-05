import { ObjectId } from 'mongodb'

export const insereUsuario = async(req, res) =>{
    req.body.avatar = `https://ui-avatars.com/api/?name=${req.body.nome.replace}(/ /g, '+'))&background=F00&color=FFF`
    //bcryptjs -> criptografar o conteúdo
    //jsonwebtoken -> para gerar o jwt
    //npm i bcryptjs jsonwebtoken
}