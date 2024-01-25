import express, {Request, Response, Router} from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router: Router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req: Request, res: Response) => {
  res.send('Image route page'); 
})

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
})

export default router;