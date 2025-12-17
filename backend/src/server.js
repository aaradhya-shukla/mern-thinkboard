import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notes.Router.js'
import connectToDb from './configs/connectMongodb.js';
import RateLimiter from "./middlewares/rateLimiter.js"
import cors from 'cors';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(RateLimiter);
app.use(express.json());

app.use('/api/notes', notesRouter);
connectToDb().then(() => {
    app.listen(PORT,() => {
        console.log("server is running on port: ",PORT)
    })
})