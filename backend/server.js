import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';

const PORT = 5000;
const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json())

// DB
connectDB();

// ROUTES
app.use("/api/auth", authRouter)


app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);

})