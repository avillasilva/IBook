import 'regenerator-runtime';
import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.post('/register', bookController.registerBook);
router.get('/:codigo_livro', bookController.getBook);
router.get('/', bookController.getBooks);
router.put('/:codigo_livro', bookController.updateBook);
router.delete('/:codigo_livro', bookController.deleteBook);

export default router;
