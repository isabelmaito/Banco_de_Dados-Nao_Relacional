import { check, param, validationResult } from 'express-validator'

const db = req.app.locals.db

//Middleware para verificar os resultados da validação
export const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: 'Error de validação',
            errors: errors.array()
        })
    }
    next()
}
export const validateMunicipio = [
    check('codigo_ibge')
        .notEmpty()
        .withMessage('O código do IBGE é obrigatório')
        .isInt({ min: 1000000, max: 9999999 })
        .withMessage('O código IBGE deve ser um número inteiro de 7 dígitos'),
    check('nome')
        .notEmpty()
        .withMessage('O nome do municipio é obrigatório')
        .isLength({max:100}).withMessage('O nome não pode ter mais que 100 caracteres'),
    check('capital')
        .isBoolean()
        .withMessage('O campo capital deve ser um booleano'),
    check('local').notEmpty()
        .withMessage('O local é obrigatório')
        .isObject()
        .withMessage('O local tem que ser um objeto'),
    check('local.type')
        .notEmpty()
        .withMessage('O tipo do local é obrigatório')
        .equals('Point')
        .withMessage('O tipo do local dee ser "Point"'),
    check('local.coordinates')
        .notEmpty()
        .withMessage('As coordenadas são obrigatórias')
        .isArray({min:2, max:2})
        .withMessage('As coordenadas devem ser um array com a Latitude e Longitude'),
    check('local.coordinates.0')
        .isFloat({min:-180, max: 180})
        .withMessage('A longitude deve estar em -180 e 180'),
    //aplica validações
    validateRequest
]

//Validações do usuário
export const validateUsuario = [
    check('nome')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome')
        .isAlpha('pt-BR', {ignore: ' '}).withMessage('Informe apenas texto')
        .isLength({min:3}).withMessage('Informe no mínimo 3 caracteres')
        .isLength({max:100}).withMessage('Informe no máximo 100 caracteres'),
    check('email')
        .not().isEmpty().trim().withMessage('É obrigatório informar o e-mail')
        .isEmail().withMessage('Informe um e-mail válido')
        .isLowercase().withMessage('Não são permitidas letras maiúsculas')
        .custom((value, { req })=> {
            return db.collection('usuario')
                 .find({email: {$eq: value}}).toArray()
                 .then((email) => {
                //Verifica se não existe o ID para garantir que é inclusão
                if(email.lenght && !req.params.id){
                    return Promise.reject(`O email ${value} já existe!`)
                }
            })
    }),
    check('senha')
        .not().isEmpty().trim().withMessage('A senha é obrigatória')
        .isLength({min:6}).withMessage('A senha deve ter no mínimo 6 caracteres')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1, 
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        }).withMessage('A senha não é segura. Informe no mínimo 1 caracter maiúsculo, 1 minúsculo e 1 caractere especial'),
    check('ativo')
        .default(true)
        .isBoolean().withMessage('O valor deve ser um booleano'),

        
]