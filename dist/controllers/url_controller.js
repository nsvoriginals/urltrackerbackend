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
const express_1 = __importDefault(require("express"));
const valid_url_1 = __importDefault(require("valid-url"));
const url_model_1 = require("../db/url_model");
const utils_1 = require("../utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const baseUrl = process.env.BASEURI || 'http://localhost:3003';
const generateUniqueShortId = () => __awaiter(void 0, void 0, void 0, function* () {
    let shortId;
    let existingURL;
    while (true) {
        shortId = (0, utils_1.generateShortID)();
        existingURL = yield url_model_1.URLModel.findOne({ urlCode: shortId });
        if (!existingURL) {
            break;
        }
    }
    return shortId;
});
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longUrl, urlCode } = req.body;
    console.log('going to shorten');
    try {
        if (!valid_url_1.default.isUri(longUrl)) {
            return res.status(401).json({ error: 'Invalid Url' });
        }
        if (urlCode) {
            const existingCodeBookmark = yield url_model_1.URLModel.findOne({ urlCode });
            if (existingCodeBookmark) {
                return res.status(400).json({ error: `Code ${urlCode} already in use. Please choose a different code.` });
            }
        }
        let generatedCode;
        if (urlCode) {
            generatedCode = urlCode;
        }
        else {
            generatedCode = yield generateUniqueShortId();
        }
        const shortUrl = `${baseUrl}/${generatedCode}`;
        console.log(shortUrl);
        const newURL = new url_model_1.URLModel({
            UrlCode: generatedCode,
            longUrl,
            shortUrl,
        });
        console.log(newURL);
        yield newURL.save();
        res.status(201).json({ shortUrl });
    }
    catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
}));
exports.default = router;
