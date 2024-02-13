import { downloadImage } from "../utils/downloadImage";
import download from "../../public/images/download.png";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const Card = ({ _id, name, prompt, photo }: CardProps) => {
  return (
    <div className="group rounded-xl relative shadow-card hover:shadow-cardhover">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[95%] hidden absolute left-0 right-0 bottom-0 m-2 p-4 bg-slate-800 rounded-md bg-opacity-85">
        <p className="text-slate-100 text-sm">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-slate-100 uppercase w-7 h-7 rounded-full object-cover flex justify-center items-center text-xs font-bold bg-orange-700">
              {name[0]}
            </div>
            <p className="text-slate-100 text-sm">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)}>
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
