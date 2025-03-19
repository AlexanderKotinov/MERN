"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Agents_1 = require("../controllers/Agents");
const router = express_1.default.Router();
router.get('/', Agents_1.getAgentsList);
router.get('/:id', Agents_1.getAgent);
router.post('/signup', Agents_1.signup);
router.patch('/:id', Agents_1.updateAgent);
router.delete('/:id', Agents_1.deleteAgent);
router.post('/login', Agents_1.login);
exports.default = router;
//# sourceMappingURL=agents.js.map