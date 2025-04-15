import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

// Permitir requisições do frontend (ajustar a URL conforme necessário)
app.use(cors({ origin: 'http://localhost:5173' })) // Porta padrão do Vite
app.use(express.json())

// Criar um usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { name, age, email } = req.body
        const newUser = await prisma.user.create({
            data: { name, age, email }
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
})

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
})

// Editar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, age, email } = req.body
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, age, email }
        })
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
})

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params
        await prisma.user.delete({ where: { id } })
        res.json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
})

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})
