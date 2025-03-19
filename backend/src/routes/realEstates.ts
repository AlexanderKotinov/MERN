import express from 'express';
import {
  newRealEastate,
  getRealEstateById,
  deleteRealEstate,
  updateRealEstate,
} from '../controllers/RealEstate';

const router = express.Router();

// router.get('/', getAgentsList);
// router.get('/:id', getAgent);
// router.post('/signup', signup);
// router.patch('/:id', updateAgent);
// router.delete('/:id', deleteAgent);
// router.post('/login', login);

router.post('/new', newRealEastate);
router.get('/:id', getRealEstateById);
router.delete('/:id', deleteRealEstate);
router.patch('/:id', updateRealEstate);

export default router;
