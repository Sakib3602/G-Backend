import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/db.js'; 
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import leadRoutes from './routes/Sales/leadRoutes.js';
import meetingRoutes from './routes/Sales/meetingRoutes.js';
import emailService from './routes/Sales/emailService.js';
import emailServiceMarketer from './routes/Marketer/emailServiceMarketer.js'
import qualifiedRoutes from "./routes/Marketer/qualifiedRoutes.js"
import campaignRoutes from "./routes/Marketer/campaign.js"
import taskRoutes from "./routes/Marketer/tasksRoutes.js"
import { DesignerTasks } from "./controllers/Marketing/taskController.js"

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  const hasBody = req.body && Object.keys(req.body).length > 0;
  console.log(`[${req.method}] ${req.originalUrl}`, hasBody ? req.body : "");
  next();
});

// database connection
connectDB();
// user related routes
app.use('/api/v1', userRoutes);
// ---------------end--------------
// sales related routes
app.use("/api/v1/sales", leadRoutes);
// meeting related routes for sales
app.use("/api/v1/sales/meetings", meetingRoutes);

// ---------------End------------------


// -----------------marketing related routes------------------------
// qualified lead related routes
app.use("/api/v1/marketing", qualifiedRoutes);  // ei route er kaj korsi lead status jokhn qualified hoy tkhn create korsi.
app.use("/api/v1/marketing/campaigns", campaignRoutes);  
app.use("/api/v1/marketing/tasks", taskRoutes);  // ei route er kaj hobe marketer er task gula dekhano mane je campaign gula ase tkhn seita dekhabe.


// -----------------marketing related routes end------------------------






// email service routes
// ---------------Sales------------------
app.use("/api/v1/sales/emailservice", emailService);
// --------------Marketing------------------
app.use("/api/v1/marketing/emailservice", emailServiceMarketer);  









// Basic ekta route check korar jonno
app.get('/', (req, res) => {
  res.send('Server is running and DB is connected!');
});

// Server run kora
app.listen(PORT, () => {
  console.log(`Server chalu hoise port: ${PORT} te 🚀`);
});