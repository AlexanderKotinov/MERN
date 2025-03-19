"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RealEstate_1 = require("../controllers/RealEstate");
const router = express_1.default.Router();
// router.get('/', getAgentsList);
// router.get('/:id', getAgent);
// router.post('/signup', signup);
// router.patch('/:id', updateAgent);
// router.delete('/:id', deleteAgent);
// router.post('/login', login);
router.post('/new', RealEstate_1.newRealEastate);
router.get('/:id', RealEstate_1.getRealEstateById);
router.delete('/:id', RealEstate_1.deleteRealEstate);
router.patch('/:id', RealEstate_1.updateRealEstate);
exports.default = router;
//# sourceMappingURL=realEstates.js.map