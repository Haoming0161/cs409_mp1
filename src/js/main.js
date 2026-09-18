const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks.map((link) =>
  document.querySelector(link.getAttribute("href"))
);
const progress = document.querySelector(".scroll-progress span");
const menu = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

function updateNavigation() {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${
    maxScroll ? (window.scrollY / maxScroll) * 100 : 0
  }%`;
  const probe = window.scrollY + nav.offsetHeight + 12;
  let current = 0;
  sections.forEach((section, index) => {
    if (section.offsetTop <= probe) current = index;
  });
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  )
    current = sections.length - 1;
  navLinks.forEach((link, index) =>
    link.classList.toggle("active", index === current)
  );
}

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  })
);
menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".carousel-dots button")];
let activeSlide = 0;
function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === activeSlide);
    slide.setAttribute("aria-hidden", String(i !== activeSlide));
  });
  dots.forEach((dot, i) => dot.classList.toggle("active", i === activeSlide));
}
document
  .querySelector(".carousel-arrow.prev")
  .addEventListener("click", () => showSlide(activeSlide - 1));
document
  .querySelector(".carousel-arrow.next")
  .addEventListener("click", () => showSlide(activeSlide + 1));
dots.forEach((dot, index) =>
  dot.addEventListener("click", () => showSlide(index))
);
document.querySelector(".carousel").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(activeSlide - 1);
  if (event.key === "ArrowRight") showSlide(activeSlide + 1);
});

const modalContent = {
  ai: {
    kicker: "01 / INTELLIGENCE",
    title: "AI & Machine Learning",
    copy: "Study how machines learn, reason, and interpret the world. Build a foundation in algorithms and data, then explore applications in language, vision, robotics, and responsible AI.",
    tags: ["ALGORITHMS", "DATA", "VISION", "NLP"],
  },
  security: {
    kicker: "02 / TRUST",
    title: "Cybersecurity",
    copy: "Learn to design systems people can depend on. Explore secure software, networks, privacy, cryptography, and the human decisions that shape digital safety.",
    tags: ["NETWORKS", "PRIVACY", "SYSTEMS", "CRYPTOGRAPHY"],
  },
  graphics: {
    kicker: "03 / EXPERIENCE",
    title: "Graphics & Games",
    copy: "Create interactive worlds and visual tools. Combine mathematics, rendering, animation, interfaces, and storytelling to make ideas visible and experiences memorable.",
    tags: ["RENDERING", "ANIMATION", "HCI", "SIMULATION"],
  },
};
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
let lastFocused;
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}
document.querySelectorAll(".modal-trigger").forEach((button) =>
  button.addEventListener("click", () => {
    const content = modalContent[button.dataset.modal];
    lastFocused = button;
    document.querySelector("#modal-kicker").textContent = content.kicker;
    document.querySelector("#modal-title").textContent = content.title;
    document.querySelector("#modal-copy").textContent = content.copy;
    document.querySelector("#modal-tags").innerHTML = content.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  })
);
closeButton.addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});
