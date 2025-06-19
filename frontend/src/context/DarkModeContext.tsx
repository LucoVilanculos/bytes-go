import { createContext, useContext, useEffect, useState } from "react";

type DarkModeContextType = {
  dark: boolean;
  toggle: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  dark: false,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("darkmode");
    return stored === "true";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkmode", String(dark));
  }, [dark]);

  function toggle() {
    setDark((d) => !d);
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}