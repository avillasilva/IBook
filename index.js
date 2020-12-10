import express from 'express'
import cors from 'cors'
import 'regenerator-runtime'
import clientRouter from './src/routes/clientRouter'
import publisherRouter from './src/routes/publisherRouter'
import bookRouter from './src/routes/bookRouter'
import borrowingRouter from './src/routes/borrowingRouter'

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
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/client', clientRouter)
app.use('/publisher', publisherRouter)
app.use('/book', bookRouter)
app.use('/borrow', borrowingRouter)

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})
