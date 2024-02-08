"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redirect_controller_1 = __importDefault(require("./controllers/redirect_controller"));
const url_controller_1 = __importDefault(require("./controllers/url_controller"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json("Hi there");
});
app.use('/', redirect_controller_1.default);
app.use('/api/url', url_controller_1.default);
exports.default = app;
