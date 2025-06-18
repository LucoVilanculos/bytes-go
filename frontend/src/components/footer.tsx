import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear =  new Date(). getFullYear();
  return (
    <footer className="bg-zinc-900 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
<<<<<<< HEAD
          <h2 className="text-lg font-semibold">BYTES-GO</h2>
          <p>
            BYTES-GO é uma plataforma de mobilidade urbana que conecta passageiros
            e motoristas de forma rápida, segura e inteligente em Maputo e região.
=======
          <h2 className="text-lg font-semibold">BytesGo</h2>
          <p>
          BytesGo, levamos você mais longe, e com segurança.<br/>Até porque a sua jornada começa aqui com confiança!
>>>>>>> 1b0b8e9935d23add0fb2455ca2317b134ae1aa25
          </p>
        </div>

        <div className="space-y-3">
<<<<<<< HEAD
          <h3 className="font-semibold uppercase">Informações</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                Sobre Nós
=======
          <h3 className="font-semibold uppercase">Informação</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                Sobre nós
>>>>>>> 1b0b8e9935d23add0fb2455ca2317b134ae1aa25
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
<<<<<<< HEAD
                Contato
              </Link>
            </li>
            <li>
              <Link to="/shipping-returns" className="hover:underline">
                Entregas & Devoluções
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:underline">
                Parcerias
=======
                Contacte-nos
>>>>>>> 1b0b8e9935d23add0fb2455ca2317b134ae1aa25
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
          <h3 className="font-semibold uppercase">Redes Sociais</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.facebook.com/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

<<<<<<< HEAD
        <div className="space-y-4 gap-4">
          <h3 className="font-semibold uppercase">Newsletter</h3>
          <p>
            <span>
              Assine nossa newsletter para receber novidades e atualizações.
            </span>
          </p>
        </div>
=======
       
>>>>>>> 1b0b8e9935d23add0fb2455ca2317b134ae1aa25
      </div>

      <hr className="my-8 border-gray-700" />

<<<<<<< HEAD
      <div className="text-center text-sm text-gray-400">
        &copy; 2025 BYTES-GO. Todos os direitos reservados.
=======
      <div className="text-center text-sm text-blue-800">
       &copy;{currentYear} <h3 className="text-blue-800 ">B4Future Moz</h3> 
>>>>>>> 1b0b8e9935d23add0fb2455ca2317b134ae1aa25
      </div>
    </footer>
  );
};