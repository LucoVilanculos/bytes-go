"use client";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandInput,
} from "../components/ui/command";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const linksLeft = [
    { label: "Contato", href: "/contacts" },
    { label: "Sobre", href: "/about" },
  ];

  // Verifica se está logado
  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;
  const isLogged = !!user;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
    navigate("/login");
  }

  function handleInicio() {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "driver") {
      navigate("/driver");
    } else if (user?.role === "customer" || user?.role === "user") {
      navigate("/user");
    } else {
      navigate("/");
    }
  }

  // Fechar barra de busca ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showSearchBar &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSearchBar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchBar]);

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6 md:px-6">
        <nav className="hidden md:flex gap-8 text-sm">
          <Button
            variant="ghost"
            className="text-sm font-normal"
            onClick={handleInicio}
          >
            Início
          </Button>
          {linksLeft.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="text-lg font-bold tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
          <NavLink to="/">Bytes-GO</NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="text-sm font-normal"
            aria-label="Abrir busca"
          >
            Buscar
          </Button>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
            }
            aria-label="Conta"
          >
            Conta
          </NavLink>

          {isLogged && (
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition ml-2"
            >
              Sair
            </Button>
          )}
        </nav>

        <div className="md:hidden w-full flex items-center justify-end text-base">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2"
            aria-label="Abrir menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            ref={searchBarRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white shadow-md border-b px-4 md:px-6 py-4"
            style={{ position: "relative", zIndex: 60 }}
          >
            <div className="max-w-7xl mx-auto">
              <Command className="w-full">
                <CommandInput
                  placeholder="Buscar..."
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                />
              </Command>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-black/90 text-white px-6 py-6"
            style={{ right: 0, left: "auto" }} // Garante que o menu venha da direita
          >
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setIsMobileOpen(false)} aria-label="Fechar menu">
                <X size={28} />
              </button>
              <span className="uppercase font-bold tracking-wider">BYTES-GO</span>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-mono">
              {[...linksLeft, { label: "Conta", href: "/account" }].map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:opacity-70"
                >
                  {link.label}
                </NavLink>
              ))}
              {isLogged && (
                <Button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleLogout();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition mt-4"
                >
                  Sair
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}