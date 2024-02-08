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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_model_1 = require("../db/url_model");
const router = (0, express_1.Router)();
router.get('/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        console.log(code);
        const URL = yield url_model_1.URLModel.findOne({ UrlCode: code });
        console.log(URL);
        if (URL) {
            return res.redirect(String(URL.longUrl));
        }
        else {
            return res.json("Nothing to be found");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
}));
exports.default = router;
