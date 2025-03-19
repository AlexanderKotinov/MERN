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
exports.getAgentRealEstates = exports.getRealEstateById = exports.updateRealEstate = exports.deleteRealEstate = exports.newRealEastate = void 0;
const http_error_1 = __importDefault(require("../models/http-error"));
const RealEstate_1 = __importDefault(require("../models/RealEstate"));
const Agent_1 = __importDefault(require("../models/Agent"));
const mongoose_1 = __importDefault(require("mongoose"));
const newRealEastate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, agent } = req.body;
    const newRealEstate = new RealEstate_1.default({
        title,
        description,
        price,
        agent,
    });
    let agentData;
    try {
        agentData = yield Agent_1.default.findById(agent);
    }
    catch (err) {
        return next(new http_error_1.default('Can\'t find correct user.', 500));
    }
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield newRealEstate.save({ session: session });
        agentData.realEstates.push(newRealEstate);
        yield agentData.save({ session: session });
        yield session.commitTransaction();
    }
    catch (err) {
        return next(new http_error_1.default('Creating real estate failed, please try again.', 500));
    }
    res.status(201).json({ realEstate: newRealEstate });
});
exports.newRealEastate = newRealEastate;
const deleteRealEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const realEstateId = req.params.id;
    let realEstate;
    try {
        realEstate = yield RealEstate_1.default.findById(realEstateId);
    }
    catch (err) {
        return next(new http_error_1.default('Something went wrong, could not delete real estate.', 500));
    }
    if (!realEstate) {
        return next(new http_error_1.default('Could not find real estate for this id.', 404));
    }
    try {
        yield realEstate.remove();
    }
    catch (err) {
        return next(new http_error_1.default('Something went wrong, could not delete real estate.', 500));
    }
    res.json({ message: 'Deleted real estate.' });
});
exports.deleteRealEstate = deleteRealEstate;
const updateRealEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const realEstateId = req.params.id;
    const { title, description, price } = req.body;
    let realEstate;
    try {
        realEstate = yield RealEstate_1.default.findById(realEstateId);
    }
    catch (err) {
        return next(new http_error_1.default('Something went wrong, could not update real estate.', 500));
    }
    if (!realEstate) {
        return next(new http_error_1.default('Could not find real estate for this id.', 404));
    }
    realEstate.title = title;
    realEstate.description = description;
    realEstate.price = price;
    realEstate.agent = req.agent.id;
    try {
        yield realEstate.save();
    }
    catch (err) {
        return next(new http_error_1.default('Something went wrong, could not update real estate.', 500));
    }
    res.json({ realEstate });
});
exports.updateRealEstate = updateRealEstate;
const getRealEstateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let realEstate;
    try {
        realEstate = yield RealEstate_1.default.findById(req.params.id);
    }
    catch (err) {
        return next(new http_error_1.default('Fetching real estate failed, please try again later.', 500));
    }
    res.json({ realEstate: realEstate.toObject({ getters: true }) });
});
exports.getRealEstateById = getRealEstateById;
const getAgentRealEstates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let realEstates;
    try {
        realEstates = yield RealEstate_1.default.find({ agentId: req.body.agentId });
    }
    catch (err) {
        return next(new http_error_1.default('Fetching real estates failed, please try again later.', 500));
    }
    res.json({ realEstates: realEstates.map((realEstate) => realEstate.toObject({ getters: true })) });
});
exports.getAgentRealEstates = getAgentRealEstates;
//# sourceMappingURL=RealEstate.js.map