//Item 01
use('funcionarios')
db.createCollection('dadosFuncionarios',
    {
        validator: {
            $jsonSchema: {
                'bsonType':'object',
                'required':['nome','cargo',
                'sexo', 'salario', 'departamento',
                'dataContratacao', 'projetos',
                'dataCadastro']
        }
    }
})

use('funcionarios')
const dadosFuncionarios =[{nome: 'João Silva', cargo: 'Desenvolvedor', 
    sexo: 'Masculino', salario: 5000, departamento: 'TI',
    dataContratacao: new Date('2023-01-01'), projetos: ['Projeto A','Projeto B'],
    dataCadastro: new Date()
},
{nome: 'Maria Santos', cargo: 'Analista de Dados',
    sexo: 'Feminino', salario: 4800, departamento: 'TI',
    dataContratacao: new Date('2023-06-15'), projetos: ['Projeto C'],
    dataCadastro: new Date()
},
{nome: 'Carlos Oliveira', cargo: 'Desenvolvedor',
    sexo: 'Masculino', salario: 5100, departamento: 'TI',
    dataContratacao: new Date('2022-03-10'), projetos: ['Projeto B'],
    dataCadastro: new Date()
},
{nome: 'Ana Pereira', cargo: 'Gerente de Projetos',
    sexo: 'Feminino', salario: 7500, departamento: 'Gestão',
    dataContratacao: new Date('2021-09-20'), projetos: ['Projeto A', 'Projeto C'],
    dataCadastro: new Date()
},
{nome: 'Luis Fernandes',cargo: 'Contador',
    sexo: 'Masculino', salario: 4200, departamento: 'Contabilidade',
    dataContratacao: new Date('2020-11-05'), projetos: [],
    dataCadastro: new Date()
},
{nome: 'Luiza Costa', cargo: 'Analista Financeira',
    sexo: 'Feminino', salario: 4600, departamento: 'Financeiro',
    dataContratacao: new Date('2023-04-18'), projetos: ['Projeto D'],
    dataCadastro: new Date()
},
{nome: 'João Souza', cargo: 'Desenvolvedor',
    sexo: 'Masculino', salario: 4900, departamento: 'TI',
    dataContratacao: new Date('2023-07-01'), projetos: ['Projeto A'],
    dataCadastro: new Date()
}
];
db.funcionarios.insertMany(dadosFuncionarios)

//Item 02
use('funcionarios')
db.funcionarios.insertOne({
    nome: 'Fernando Luiz', cargo: 'Desenvolvedor',
sexo: 'Masculino', salario: 7900, departamento: 'TI',
dataContratacao: new Date('2019-04-17'),
projetos: ['Projeto A'], dataCadastro: new Date()
})

//Item 03
use('funcionarios')
db.funcionarios.updateMany({},
    {$inc: {salario: +100}}
)

//Item 04
use('funcionarios')
db.funcionarios.updateOne({nome: 'João Silva'},
    {$push: {projetos: 'Projeto C'}}
)

//Item 05
use('funcionarios')
db.funcionarios.updateMany({}, {$unset: {dataContratacao: ''}})

//Item 06
use('funcionarios')
db.funcionarios.updateMany({departamento: 'TI'}, {$set: {bonificacao: 500}})

//Item 07
use('funcionarios')
db.funcionarios.deleteOne({nome: 'João Silva'})

//Item 08
use('funcionarios')
db.funcionarios.deleteMany({departamento: 'Contabilidade'})

//Item 09 
use('funcionarios')
db.funcionarios.find(
    {cargo: 'Desenvolvedor'},
    {nome: 1, sexo: 1, salario: 1 , _id: 0}
)

//Item 10
use('funcionarios')
db.funcionarios.find({salario: {$gt: 4000}}
)

//Item 11
use('funcionarios')
db.funcionarios.find({dataContratacao: {$gte: new Date('2023-01-01'), 
    $lt: new Date('2024-01-01')}}
)

//Item 12
use('funcionarios')
db.funcionarios.find({
    $or: [
        {projetos: {$eq: 'Projeto A'}},
        {projetos: {$eq: 'Projeto B'}}
    ]
})


use('funcionarios')
db.funcionarios.find()
