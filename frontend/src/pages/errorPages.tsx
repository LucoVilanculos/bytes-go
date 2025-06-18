import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

export const ErrorPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-zinc-800 to-zinc-400">
      <div className="text-center flex flex-col items-center gap-4 p-6">
        <h1 className="text-[10rem] font-mono font-extrabold text-white animate-pulse leading-none">
          404
        </h1>
        <p className="text-xl text-gray-300 font-mono">
          Ops... Parece que você se perdeu
        </p>
        <Link to="/">
          <Button className="mt-4 bg-black text-white font-mono px-6 py-2 rounded hover:bg-slate-800 hover:text-white hover:scale-105 transition-all duration-300">
            Voltar para a Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
