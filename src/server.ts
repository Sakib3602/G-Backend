import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/db.js'; 
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// database connection
connectDB();


app.use('/api/v1', userRoutes);

// Basic ekta route check korar jonno
app.get('/', (req, res) => {
  res.send('Server is running and DB is connected!');
});

// Server run kora
app.listen(PORT, () => {
  console.log(`Server chalu hoise port: ${PORT} te 🚀`);
});