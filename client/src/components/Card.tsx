import { downloadImage } from "../utils/downloadImage";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const Card = ({_id, name, prompt, photo}: CardProps) => {
  return (
    <div className="group rounded-xl relative shadow-card hover:shadow-cardhover">
      <img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />
    </div>
  )
}

export default Card