import express from 'express'
import cors from 'cors'
import 'regenerator-runtime'
import clientRouter from './src/routes/clientRouter'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.use('/client', clientRouter)

// app.get('/todos', async (req, res) => {
//     try {
//         const allTodos = await pool.query('SELECT * FROM todo')
//         res.json(allTodos.rows)
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// // Get a todo
// app.get('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
//             id
//         ])
//         res.json(todo.rows)
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// // Update a todo
// app.put('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { description } = req.body
//         const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
//             description, 
//             id
//         ])
//         res.json('Todo was updated!')
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// // Delete a todo
// app.delete('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
//             id
//         ])
//         res.json('Todo was deleted!')
//     } catch (err) {
//         console.log(err.message)
//     }
// })

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})