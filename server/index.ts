import express, {Request, Response, Express} from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/post', postRoutes);
app.use('/api/image', imageRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send("Hello fron DALL-E with TS!!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port 8080`)
    );
  }
  catch (error) {
    console.log(error);
  }
}

startServer();