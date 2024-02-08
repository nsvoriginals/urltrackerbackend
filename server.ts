import  connect  from './config/db';
import app from './index';
import dotenv from 'dotenv';

dotenv.config();
const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Server is running on ${PORT}`);
    } catch (error:any) {
        console.log(error.message);
    }
});
