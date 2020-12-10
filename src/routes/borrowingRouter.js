import 'regenerator-runtime'
import express from 'express'
import * as borrowingController from '../controllers/borrowingController'

const router = express.Router()

router.post('/:codigo_cliente', borrowingController.borrow)
router.get('/:codigo_cliente', borrowingController.clientBorrows)
router.put('/:num_emprestimo', borrowingController.updateBorrowStatus)

export default router