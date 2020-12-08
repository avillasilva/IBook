import 'regenerator-runtime';
import express from 'express';
import * as clientController from '../controllers/clientController';

const router = express.Router();

router.post('/register', clientController.registerClient);
router.get('/:codigo_cliente', clientController.getClient);
router.get('/', clientController.getClients);
router.put('/:codigo_cliente', clientController.updateClient);
router.delete('/:codigo_cliente', clientController.deleteClient);

export default router;
