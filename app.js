import express from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import {config} from 'dotenv';
import userRoutes from './routes/user.routes.js';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';


config();
const app = express();



app.use(express.json());
app.use(cors({
    origin:[process.env.Frontend_URL],
    credentials: true,
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/v1/user', userRoutes);
app.use(errorMiddleware)
app.use('/ping', function(req,res){
    res.send('/pong')
})
export default app;
