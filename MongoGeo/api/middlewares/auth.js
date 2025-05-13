import jwt from 'jsonwebtoken'
export default async function auth(req, res, next){
    const token = req.header('access-token') //obtem o token
    if(!token) return res.status(401).json({ //401-Not Authorized
        msg: 'Acesso negado. É obrigatório o envio do token JWT.'
    })
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.usuario = decoded.usuario //adicionamos usuário atual na requisição 
        next() //direcionamos para o endpoint
    } catch(e){
        res.status(403).send({error: 'Token inválido!'})
    }
}