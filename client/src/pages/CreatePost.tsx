import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getRandomPrompt } from "../utils/getRandomPrompt";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

interface Iform {
  name: string;
  prompt: string;
  photo: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Iform>({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response: Response = await fetch(
          "http://localhost:8080/api/post",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        alert("Successfully shared!");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate the image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    // const baseUrl = window.location.origin;

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response: Response = await fetch(
          "http://localhost:8080/api/image",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        // console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt to generate image");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-slate-700 text-3xl">Create</h1>
        <p className="mt-2 text-slate-400 text-lg max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="ex..John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Click button to generate random prompt"
            value={form.prompt}
            isRandomPrompt
            handleChange={handleChange}
            handleRandomPrompt={handleRandomPrompt}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 w-64 h-64 p-3 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="/images/preview.png"
                alt="preview-img"
                className="w-9/12 h-[75%] object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-gray-800/50">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-blue-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="text-white bg-blue-400 px-5 py-2 rounded-md text-sm font-medium sm:w-auto w-full"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
          <p className="mt-2 text-gray-400 text-sm">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
