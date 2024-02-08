"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortID = void 0;
const base62Alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const generateShortID = () => {
    let shortId = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * base62Alphabet.length);
        shortId += base62Alphabet.charAt(randomIndex);
    }
    return shortId;
};
exports.generateShortID = generateShortID;
