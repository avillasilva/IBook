<<<<<<< HEAD
import express from 'express'
import cors from 'cors'
import 'regenerator-runtime'
import clientRouter from './src/routes/clientRouter'
import publisherRouter from './src/routes/publisherRouter'
import bookRouter from './src/routes/bookRouter'
import borrowingRouter from './src/routes/borrowingRouter'
=======
import express from 'express';
import cors from 'cors';
import 'regenerator-runtime';
import clientRouter from './src/routes/clientRouter';
import publisherRouter from './src/routes/publisherRouter';
>>>>>>> 3eaca0f9509bc6eeb2cf48e0fd77dc92ec876e71

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));

app.use('/client', clientRouter);
app.use('/publisher', publisherRouter);

// Configurando a Template Engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: app,
  noCache: true,
});

app.get('/', (req, res) => {
<<<<<<< HEAD
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/client', clientRouter)
app.use('/publisher', publisherRouter)
app.use('/book', bookRouter)
app.use('/borrow', borrowingRouter)

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})
=======
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});

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
>>>>>>> 3eaca0f9509bc6eeb2cf48e0fd77dc92ec876e71
