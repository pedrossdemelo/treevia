import * as Icons from "phosphor-react";
import { useEffect, useState } from "react";
import { toggleTheme } from "../utils";

export default function ThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  const [currTheme, setCurrTheme] = useState(isDark ? "dark" : "light");

  const [icon, setIcon] = useState(isDark ? "MoonStars" : "SunDim");

  useEffect(() => {
    setIcon(currTheme === "dark" ? "MoonStars" : "SunDim");
  }, [currTheme]);

  const Icon = Icons[icon];

  return (
    <button
      className="fixed bottom-4 right-4 bg-bgcolor p-2 rounded-full flex items-center justify-center"
      onClick={() =>
        toggleTheme() || setCurrTheme(currTheme === "dark" ? "light" : "dark")
      }
    >
      <Icon size="24" weight="bold" />
    </button>
  );
}
