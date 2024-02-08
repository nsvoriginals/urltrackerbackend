"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URLSchema = new mongoose_1.default.Schema({
    UrlCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: false,
});
const URLModel = mongoose_1.default.model('Url', URLSchema);
exports.URLModel = URLModel;
