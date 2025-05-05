use ('estoque')
db.usuarios.insertOne({
    'nome': 'Maria José',
    'e-mail': 'mariajose@uol.com.br',
    'senha': '123Mudar',
    'ativo': true,
    'tipo': 'Cliente',
    'avatar': 'https://ui-avatars.com/api?name=Maria+Jose&background=F00&color=FFF'
})

//Criando um indice único para o e-mail
db.usuarios.createIndex({'email':1}),({unique:true})

//Listando os usuários
db.usuarios.find({},{senha:0})