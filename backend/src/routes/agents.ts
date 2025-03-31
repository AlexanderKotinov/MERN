import express from 'express';
import {
  getAgentsList,
  getAgent,
  updateAgent,
  deleteAgent,
  login,
  signup,
} from '../controllers/Agents';
import fileUpload from '../middleware/file-upload';
import { checkAuth } from '../middleware/check-auth';

const router = express.Router();

router.get('/', checkAuth, getAgentsList);
router.get('/:id', checkAuth, getAgent);
router.post('/signup', fileUpload.single('photo'), signup);
router.patch('/:id', checkAuth, updateAgent);
router.delete('/:id', checkAuth, deleteAgent);
router.post('/login', login);

export default router;
