import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import serviceRoutes from './routes/service.route.js'

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use("/api/services", serviceRoutes);
//app.use(express.json())


app.use(cors());

const PORT = 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
