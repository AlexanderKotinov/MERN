"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const agents_1 = __importDefault(require("./routes/agents"));
const realEstates_1 = __importDefault(require("./routes/realEstates"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_error_1 = __importDefault(require("./models/http-error"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: './.env.local' });
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
const host = process.env.HOST;
const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pq8c3.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_DB}`;
app.use(body_parser_1.default.json()); // for post requests
app.use((0, cors_1.default)({ origin: '*' }));
app.use('/api/agents', agents_1.default);
app.use('/api/real-estates', realEstates_1.default);
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});
app.use((req, res, next) => {
    const error = new http_error_1.default('Could not find this route.', 404);
    next(error);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
mongoose_1.default.connect(mongoUri, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
        console.log(`Application started at http://${host}:${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
//# sourceMappingURL=app.js.map