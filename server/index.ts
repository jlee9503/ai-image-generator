import express, {Request, Response, Express} from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './mongodb/connect';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req: Request, res: Response) => {
  res.send("Hello fron DALL-E with TS");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => console.log(`server started on PORT 8080`));
  }
  catch (error) {
    console.log(error);
  }
}

startServer();