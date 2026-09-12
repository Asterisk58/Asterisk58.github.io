const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const glow = document.querySelector(".cursor-glow");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "☾" : "☼";
}

themeToggle.addEventListener("click", () => {
  const dark = root.dataset.theme === "dark";
  root.dataset.theme = dark ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  themeToggle.textContent = dark ? "☼" : "☾";
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".project, .fact, .skill, .quote-card, .now-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .65s ease, transform .65s ease";
  observer.observe(el);
});
