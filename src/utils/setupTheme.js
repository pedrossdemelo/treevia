export default function setupTheme() {
  const urlTheme = new URLSearchParams(window.location.search).get("theme");

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (urlTheme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else if (urlTheme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }
}
