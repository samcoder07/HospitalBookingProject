import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
	origin: true
}