import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { searchStudentByRollNo } from '../controllers/studentController.js';




const studentRouter = express.Router();

studentRouter.get('/search-by-roll', authenticateToken, authorizeRoles("admin"), searchStudentByRollNo)



export default  studentRouter;