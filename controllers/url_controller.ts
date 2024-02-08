import express, { Request, Response, Router } from 'express';
import validUrl from 'valid-url';
import shortid from 'shortid';
import { URLModel } from '../db/url_model';
import { generateShortID } from '../utils';
import dotenv from 'dotenv';
dotenv.config();

const router: Router = express.Router();
const baseUrl: string | undefined = 'https://urltracker.onrender.com';

const generateUniqueShortId = async (): Promise<string> => {
    let shortId: string;
    let existingURL;
    
    while (true) {
        shortId = generateShortID();
        existingURL = await URLModel.findOne({ urlCode: shortId });

        if (!existingURL) {
            break;
        }
    }
    return shortId;
};

router.post('/shorten', async (req: Request, res: Response) => {
    const { longUrl, urlCode }: { longUrl: string, urlCode?: string } = req.body;
    console.log('going to shorten');
    
    try {
        if (!validUrl.isUri(longUrl)) {
            return res.status(401).json({ error: 'Invalid Url' });
        }

        if (urlCode) {
            const existingCodeBookmark = await URLModel.findOne({ urlCode });

            if (existingCodeBookmark) {
                return res.status(400).json({ error: `Code ${urlCode} already in use. Please choose a different code.` });
            }
        }

        let generatedCode: string;
        if (urlCode) {
            generatedCode = urlCode;
        } else {
            generatedCode = await generateUniqueShortId();
        }
        
        const shortUrl: string = `${baseUrl}/${generatedCode}`;console.log(shortUrl)

        const newURL = new URLModel({
            UrlCode: generatedCode,
            longUrl,
            shortUrl,
        });
        console.log(newURL)
        await newURL.save();
        
        res.status(201).json({ shortUrl });
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});

export default router;
