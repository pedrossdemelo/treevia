export default function toggleTheme() {
  const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";

  if (currentTheme === "dark") {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    return;
  }

  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}