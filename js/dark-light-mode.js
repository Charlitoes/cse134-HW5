document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("theme") || "light"; // Default to light mode
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.getElementById("themeToggle").textContent = "☀️"; // Sun icon for dark mode
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.getElementById("themeToggle").textContent = "🌙"; // Moon icon for light mode
    }
  });

  // Event listener for the theme toggle button
  document.getElementById("themeToggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      // Switch to light mode
      document.documentElement.removeAttribute("data-theme");
      document.getElementById("themeToggle").textContent = "🌙"; // Moon icon
      localStorage.setItem("theme", "light"); // Save light mode preference
    } else {
      // Switch to dark mode
      document.documentElement.setAttribute("data-theme", "dark");
      document.getElementById("themeToggle").textContent = "☀️"; // Sun icon
      localStorage.setItem("theme", "dark"); // Save dark mode preference
    }
  });