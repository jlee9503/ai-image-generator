import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import postSchedma from '../mongodb/models/imagePost.js';

dotenv.config();

const router = express.Router();

export default router;