import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-900 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">BYTES-GO</h2>
          <p>
            BYTES-GO, levamos você mais longe e com segurança.<br />
            A sua jornada começa aqui, com confiança!
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Informações</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contacte-nos
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Localização</h3>
          <ul className="space-y-1">
            <li>Maputo Cidade</li>
            <li>Maputo Província</li>
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
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        &copy; {currentYear} BYTES-GO. Todos os direitos reservados.
      </div>
    </footer>
  );
};