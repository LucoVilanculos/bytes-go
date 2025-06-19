"use client";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandInput,
} from "../components/ui/command";
import { useDarkMode } from "../context/DarkModeContext";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { dark, toggle } = useDarkMode();

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
      navigate("/account");
    } else {
      navigate("/");
    }
  }

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
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6 md:px-6">
        {/* Esquerda - Links (desktop) */}
        <nav className="gap-8 text-sm flex-1 hidden md:flex">
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

        {/* Centro - Logo */}
        <div className="text-lg font-bold tracking-widest uppercase flex-1 text-center">
          <NavLink to="/">Bytes-GO</NavLink>
        </div>

        {/* Direita - Links e ações (desktop) */}
        <nav className="items-center gap-4 text-sm flex-1 justify-end hidden md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="text-sm font-normal"
            aria-label="Abrir busca"
          >
            Buscar
          </Button>

          {isLogged && (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
              }
              aria-label="Conta"
            >
              Conta
            </NavLink>
          )}

          {isLogged && (
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition ml-2"
            >
              Sair
            </Button>
          )}

          {/* Botão Dark Mode */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Alternar dark mode"
            onClick={toggle}
            className="ml-2"
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </Button>
        </nav>

        {/* Direita - Menu mobile (só aparece no mobile) */}
        <div className="md:hidden flex items-center flex-1 justify-end gap-2">
          {/* Botão Dark Mode no mobile */}
          <button
            onClick={toggle}
            aria-label="Alternar dark mode"
            className="p-2 rounded focus:outline-none"
          >
            {dark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="p-2 rounded focus:outline-none"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Barra de busca */}
      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            ref={searchBarRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white dark:bg-gray-900 shadow-md border-b px-4 md:px-6 py-4"
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
            style={{ right: 0, left: "auto" }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="uppercase font-bold tracking-wider">BYTES-GO</span>
              <button onClick={() => setIsMobileOpen(false)} aria-label="Fechar menu">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-mono">
              <NavLink
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="hover:opacity-70"
              >
                Início
              </NavLink>
              {linksLeft.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:opacity-70"
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/account"
                onClick={() => setIsMobileOpen(false)}
                className="hover:opacity-70"
              >
                Conta
              </NavLink>
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
              {/* Botão Dark Mode no menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Alternar dark mode"
                onClick={toggle}
                className="mt-4"
              >
                {dark ? <Sun size={22} /> : <Moon size={22} />}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}