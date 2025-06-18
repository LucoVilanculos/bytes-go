"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "./ui/button";
import type { Product } from "../types/products";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const linksLeft = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contacts" },
    { label: "About", href: "/about" },
  ];

  // Buscar sugestões
  /*
    useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const result = await getProducts({ data: {} });
        if (Array.isArray(result)) {
          const filtered = result.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [search]);
  */ 

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
            Search
          </Button>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
            }
            aria-label="Conta"
          >
            Account
          </NavLink>

         
        </nav>

        <div className="md:hidden w-full flex items-center justify-between text-base">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2"
            aria-label="Abrir menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <button
              aria-label="Abrir busca"
              onClick={() => setShowSearchBar((prev) => !prev)}
            >
              <Search size={20} />
            </button>
     
          </div>
        </div>
      </div>

      {/* Barra de busca animada */}
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
                  placeholder="Search product..."
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                />
                {search.length >= 2 && (
                  <CommandList>
                    <CommandGroup heading="Results">
                      {suggestions.length > 0 ? (
                        suggestions.map((product, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              setShowSearchBar(false);
                              setSearch("");
                              navigate(`/product/${product._id}`);
                            }}
                            className="cursor-pointer"
                          >
                            {product.name}
                          </CommandItem>
                        ))
                      ) : (
                        <CommandItem disabled>No product found</CommandItem>
                      )}
                    </CommandGroup>
                    <CommandSeparator />
                  </CommandList>
                )}
              </Command>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-black/90 text-white px-6 py-6"
          >
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setIsMobileOpen(false)} aria-label="Fechar menu">
                <X size={28} />
              </button>
              <span className="uppercase font-bold tracking-wider">B4F ECOMMERCE</span>
              <div className="flex gap-3">
                <Search size={20} />
                <ShoppingCart size={20} />
              </div>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-mono">
              {[...linksLeft, { label: "Account", href: "/account" }].map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:opacity-70"
                >
                  {link.label}
                </NavLink>
              ))}
         
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart overlay */}
    </header>
  );
}