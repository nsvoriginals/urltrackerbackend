import crypto from 'crypto';
const base62Alphabet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateShortID=():string=>{
    let shortId:string=''
    const length:number=6;
    for (let i=0;i<length;i++){
        const randomIndex: number = Math.floor(Math.random() * base62Alphabet.length);
        shortId += base62Alphabet.charAt(randomIndex);
    }
     return shortId;

}
export {generateShortID};