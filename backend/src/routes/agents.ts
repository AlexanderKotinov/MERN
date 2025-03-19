import express from 'express';
import {
  getAgentsList,
  getAgent,
  updateAgent,
  deleteAgent,
  login,
  signup,
} from '../controllers/Agents';

const router = express.Router();

router.get('/', getAgentsList);
router.get('/:id', getAgent);
router.post('/signup', signup);
router.patch('/:id', updateAgent);
router.delete('/:id', deleteAgent);
router.post('/login', login);

export default router;
