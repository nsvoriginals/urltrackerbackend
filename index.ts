import express, { Application } from 'express';
import redirect from './controllers/redirect_controller';
import url from './controllers/url_controller';
import cors from 'cors'

const app:Application=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json("Hi there")
})
app.use('/',redirect)
app.use('/api/url',url);
export default app;