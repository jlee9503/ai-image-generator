import mongoose from "mongoose";

interface IPost {
  name: string;
  prompt: string;
  photo: string;
}

const Post = new mongoose.Schema<IPost>({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const postSchedma = mongoose.model<IPost>("Post", Post);

export default postSchedma;
