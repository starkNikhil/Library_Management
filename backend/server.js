import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT = 5000;
const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json())

// DB


// ROUTES
app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);

})