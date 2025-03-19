"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = exports.deleteAgent = exports.updateAgent = exports.getAgent = exports.getAgentsList = void 0;
const http_error_1 = __importDefault(require("../models/http-error"));
const Agent_1 = __importDefault(require("../models/Agent"));
const agents = [
    {
        name: 'John Doe',
        email: 'email1@mail.com',
        password: 'password',
        id: '1',
    },
    {
        name: 'Jane Doe',
        email: 'email2@mail.com',
        password: 'password',
        id: '2',
    },
    {
        name: 'John Smith',
        email: 'email3@mail.com',
        password: 'password',
        id: '3',
    },
];
const getAgentsList = (req, res, next) => {
    if (agents.length === 0) {
        return next(new http_error_1.default('Agents not found :(', 404));
    }
    res.json(agents);
};
exports.getAgentsList = getAgentsList;
const getAgent = (req, res, next) => {
    const agentId = req.params.id;
    const agent = agents.find((agent) => agent.id === agentId);
    if (agent) {
        res.json(agent);
    }
    else {
        return next(new http_error_1.default('Agent not found :(', 404));
    }
};
exports.getAgent = getAgent;
const updateAgent = (req, res, next) => {
    const agentId = req.params.id;
    const { name, email } = req.body;
    const agent = agents.find((agent) => agent.id === agentId);
    if (agent) {
        agent.name = name;
        agent.email = email;
        res.json(agent);
    }
    else {
        return next(new http_error_1.default('Agent not found :(', 404));
    }
};
exports.updateAgent = updateAgent;
const deleteAgent = (req, res, next) => {
    const agentId = req.params.id;
    const agentIndex = agents.findIndex((agent) => agent.id === agentId);
    agents.splice(agentIndex, 1);
    res.json(agents);
};
exports.deleteAgent = deleteAgent;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const agent = yield Agent_1.default.findOne({ email: email });
    if (!agent) {
        return res.status(404).json({ message: 'Agent not found :(' });
    }
    if (agent.password === password) {
        res.json({ message: 'Login successful!' });
    }
    else {
        return next(new http_error_1.default('Invalid password :(', 401));
    }
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingAgent = yield Agent_1.default.findOne({ email: email });
    if (existingAgent) {
        return next(new http_error_1.default('Agent already exists :(', 422));
    }
    const newAgent = new Agent_1.default({
        name,
        email,
        password,
        realEstates: [],
    });
    try {
        yield newAgent.save();
        res.status(201).json(newAgent);
    }
    catch (err) {
        return next(new http_error_1.default('Signing up failed :(', 500));
    }
});
exports.signup = signup;
// export default {
//   getAgentsList,
//   getAgent,
//   updateAgent,
//   deleteAgent,
//   login,
//   signup,
// };
//# sourceMappingURL=Agents.js.map