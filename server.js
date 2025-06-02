import express, { Router } from 'express'
import pkg from '@prisma/client'
import cors from 'cors'
const { PrismaClient } = pkg
// Importando o PrismaClient do pacote @prisma/client
// Prisma é uma ferramenta ORM (Object-Relational Mapping) para Node.js
const prisma = new PrismaClient()

//Get : listar
//post: criar
//Put: Eddiatr varios 
//Patch: Editar um unico
//Delete: Deletar

const app = express()
app.use(express.json())
// Middleware para analisar o corpo da requisição como JSON
app.use(cors())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
      
    res.status(201).json(req.body)

      // 201: deu e criei tudo que era para criar o usuario

 })
    
app.get('/usuarios', async (req, res) => {
    let users = [];
    // Monta filtro apenas com campos presentes na query
    const filter = {};
    if (req.query.name) filter.name = req.query.name;
    if (req.query.email) filter.email = req.query.email;
    if (req.query.age) filter.age = Number(req.query.age);

    if (Object.keys(filter).length > 0) {
        users = await prisma.user.findMany({ where: filter });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
    // 200: deu tudo certo e retornou a lista de usuarios
}) 

app.put('/usuarios/:id', async (req, res) => {

   await prisma.user.uptade({
      where: {
         id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })


    res.status(201).json(req.body)
      // 201: deu e criei tudo que era para criar o usuario
 })

app.delete('/usuarios/:id', async (req, res) => {
    try {
        // Se o id for do tipo Int no schema.prisma, converta:
        // const id = Number(req.params.id);
        // Se for String/UUID, use direto:
        const id = req.params.id;

        await prisma.user.delete({
            where: { id }
        });

        res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        // Se o usuário não existir, Prisma lança um erro
        res.status(404).send({ message: 'Usuário não encontrado!', error: error.message });
    }
});


app.listen(3000)


/*
Criar nossa API DE USUARIOS

-CRIAR UM USUARIP
-LISTAR USUARIOS
//Editar um usuario
//Deletar um usuario


// tipo de rota /Metodo HTTP
// endereço */