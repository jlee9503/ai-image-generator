import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center bg-white border-b border-b-[#e6ebf4]px-4 py-4 sm:px-8 max-w-7xl mx-auto">
        <Link to="/">
          <img src="images/logo.png" alt="logo" className="w-28 h-16 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="font-medium bg-blue-400 px-16 sm:px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
