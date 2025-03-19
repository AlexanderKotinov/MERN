"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const agentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    realEstates: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'RealEstate',
        },
    ],
});
agentSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('Agent', agentSchema);
//# sourceMappingURL=Agent.js.map