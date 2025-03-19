"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = HttpError;
//# sourceMappingURL=http-error.js.map