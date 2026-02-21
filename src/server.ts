import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/db.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

// database connection
connectDB();

// Basic ekta route check korar jonno
app.get('/', (req, res) => {
  res.send('Server is running and DB is connected!');
});

// Server run kora
app.listen(PORT, () => {
  console.log(`Server chalu hoise port: ${PORT} te 🚀`);
});