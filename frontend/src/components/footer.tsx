import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


export const Footer = () => {
  const currentYear =  new Date(). getFullYear();
  return (
    <footer className="bg-zinc-900 text-white font-mono px-4 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">BytesGo</h2>
          <p>
          BytesGo, levamos você mais longe, e com segurança.<br/>Até porque a sua jornada começa aqui com confiança!
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Informação</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contacte-nos
              </Link>
            </li>
          </ul>
       
        </div>
         <div>
          <ul>
            <h4>Localização</h4>
            <li>Maputo Cidade</li>
            <li>Maputo província</li>
            <li>Matola</li>
            <li>Cidade da Matola</li>
         
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Social</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://www.facebook.com/" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://x.com" className="hover:underline">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

       
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-blue-800">
       &copy;{currentYear} <h3 className="text-blue-800 ">B4Future Moz</h3> 
      </div>
    </footer>
  );
};