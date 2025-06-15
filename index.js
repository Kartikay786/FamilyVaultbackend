dotenv.config();
import express from 'express'
const app = express();
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnection from './src/utils/dbconnection.js';
import familyRouter from './src/modules/routes/family.route.js'
import memberRouter from './src/modules/routes/member.route.js'
import path from 'path'
import { fileURLToPath } from 'url';

app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images',express.static(path.join(__dirname,'./public/Images')));

app.get('/',(req,res)=> res.send('Server is running'));
dbconnection();

app.use('/api/family',familyRouter);
app.use('/api/member',memberRouter)

const Port = process.env.PORT || 5000;
app.listen(Port,()=>{
    console.log(`App listening on http://localhost:${Port}`);
})