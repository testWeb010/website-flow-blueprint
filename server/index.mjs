import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from "./db/conn.mjs";
import path from "path";
import http from 'http';
import { websocketService } from './services/websocketService.mjs';

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method}\t ${new Date().toLocaleString()}\t ${req.url}`);
  next();
});

// Check if user is admin middleware
const requireAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'mainAdmin')) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  next();
};

// Initialize WebSocket service
websocketService.initialize(server);

// Admin activity logging middleware
const logAdminActivity = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(body) {
    // Only log successful admin actions
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user && req.user.role?.includes('admin')) {
      const action = req.method + '_' + req.path.split('/').filter(Boolean).join('_');
      const details = typeof body === 'string' ? body : JSON.stringify(body).substring(0, 100);
      
      websocketService.broadcastActivity(
        req.user.username,
        action,
        details,
        req.ip || 'unknown'
      );
    }
    
    return originalSend.call(this, body);
  };
  
  next();
};
// Apply activity logging middleware
app.use(logAdminActivity);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use("/api/auth", authRouter);
// app.use("/api/report", requireAuth, reportRouter);

// Apply both requireAuth and requireAdmin middleware for admin routes
// app.use("/api/admin", requireAuth, requireAdmin, adminRouter);
// app.use("/api/user", requireAuth, userRouter);


// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    // Use the server to listen instead of app.listen
    server.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server");
        return;
      }
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

