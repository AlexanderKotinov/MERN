"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const realEstateSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    agent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true,
    },
});
exports.default = mongoose_1.default.model('RealEstate', realEstateSchema);
//# sourceMappingURL=RealEstate.js.map