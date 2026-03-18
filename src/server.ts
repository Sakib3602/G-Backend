import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/db.js'; 
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import leadRoutes from './routes/Sales/leadRoutes.js';
import meetingRoutes from './routes/Sales/meetingRoutes.js';
import emailService from './routes/Sales/emailService.js';

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`, req.body);
  next();
});

// database connection
connectDB();
// user related routes
app.use('/api/v1', userRoutes);
// sales related routes
app.use("/api/v1/sales", leadRoutes);
// meeting related routes for sales
app.use("/api/v1/sales/meetings", meetingRoutes);



// email service routes

// ---------------Sales------------------
app.use("/api/v1/sales/emailservice", emailService)
// ---------------Manager------------------






// Basic ekta route check korar jonno
app.get('/', (req, res) => {
  res.send('Server is running and DB is connected!');
});

// Server run kora
app.listen(PORT, () => {
  console.log(`Server chalu hoise port: ${PORT} te 🚀`);
});