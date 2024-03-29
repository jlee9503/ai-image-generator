import express, {Request, Response, Router} from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/imagePost.js';

interface IPost {
  name: string;
  prompt: string;
  photo: string;
}

dotenv.config();

const router:Router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req: Request, res: Response) => {
  try {
    const allposts = await Post.find({});
    res.status(200).json({ success: true, data: allposts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again: ' + error });
  }
});

router.route('/').post(async (req:Request, res:Response) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost: IPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to create a post, please try again: " + error,
      });
  }
})

export default router;