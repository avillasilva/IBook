import 'regenerator-runtime'
import express from 'express'
import * as publisherController from '../controllers/publisherController'

const router = express.Router()

router.post('/register', publisherController.registerPublisher)
router.get('/:codigo_editora', publisherController.getPublisher)
router.get('/', publisherController.getPublishers)
router.put('/:codigo_editora', publisherController.updatePublisher)
router.delete('/:codigo_editora', publisherController.deletePublisher)

export default router