import {Router,Response,Request} from 'express';
import { URLModel } from '../db/url_model';
const router=Router();
router.get('/:code',async(req:Request,res:Response)=>{
    try{
        const {code} = req.params;
        console.log(code)
        const URL = await URLModel.findOne({UrlCode:code});
        console.log(URL)
        if(URL){
            return res.redirect(String(URL.longUrl));
        }
        else{
            return res.json("Nothing to be found")
        }

    }
    catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
})
export default router;