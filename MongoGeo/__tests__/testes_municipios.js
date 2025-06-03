const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api';

describe('API REST de Municipios sem o Token', () => {
    it('GET / Lista todos os municipios sem token', async () => {
        const response = await request(baseURL)
            .get('/municipios')
            .set('Content-Type', 'application/json')
            .expect(401);
    })

    it('GET - Listar o municipio pelo ID sem token', async () => {
        const id = "67cf88945d4f674a9a8c3390";
        const response = await request(baseURL)
            .get(`/municipios/${id}`)
            .set('content-type', 'application/json')
            .expect(401);
    })
})

describe('API REST de Municipios com o Token', () => {
    let token;
    it('POST - Autentica Usuario', async () => {
        const email = process.env.EMAIL_USUARIO;
        const senha = process.env.SENHA_USUARIO;
        const response = await request(baseURL)
            .post('/usuarios/login')
            .set('Content-Type', 'application/json')
            .send({ email, senha })
            .expect(200);
        
        token = response.body.token;
        expect(token).toBeDefined();
    })
})