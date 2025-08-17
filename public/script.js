// -------------------- Smooth Scroll --------------------
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    document.getElementById("nav-links").classList.remove("show");
  });
});

// -------------------- Scroll Reveal --------------------
const revealElements = document.querySelectorAll(
  'section h2, .exp-card, .project-card, #skills li, #certifications li, .testimonial-card, .blog-card'
);
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active'); // optional: keep them animated each time
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// -------------------- Skills --------------------
const skills = {
  "JavaScript (ES6+)": 85,
  "C++":65,
  "JAVA":50,
  "DevOps (Docker, Kubernetes, CI/CD)": 65,   // <-- NEW
  "Cloud (AWS, GCP basics)": 60,
  "HTML/CSS":90,
  "Python": 80,
  "React.js": 75,
  "Node.js, Express.js": 70,
  "AI/ML":85,
  "Databases(Postgresql)": 80,
  "Tools (Git, Vercel, Railway, Cloudinary, Render)": 85
};
const skillList = document.querySelector("#skills ul");
skillList.innerHTML = "";
Object.entries(skills).forEach(([skill, percent]) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${skill}</span>
    <div class="progress-bar">
      <div class="progress" style="width: 0%"></div>
    </div>
  `;
  skillList.appendChild(li);
  const progressBar = li.querySelector(".progress");
  function animateProgress() {
    const rect = li.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      progressBar.style.width = percent + "%";
      window.removeEventListener("scroll", animateProgress);
    }
  }
  window.addEventListener("scroll", animateProgress);
  animateProgress();
});

// -------------------- Mobile Menu --------------------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

// -------------------- Theme Toggle --------------------
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "🌞";
}
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  if (body.classList.contains("light")) {
    themeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

// -------------------- Typing Animation --------------------
const typingElement = document.querySelector(".typing");
const roles = [
  "Computer Engineer",
  "Full-Stack Developer",
  "Frontend & Backend Specialist",
  "AI & ML Enthusiast",
  "Problem Solver"
];
let roleIndex = 0, charIndex = 0, currentText = "", isDeleting = false;
function typeEffect() {
  if (roleIndex >= roles.length) roleIndex = 0;
  currentText = roles[roleIndex];
  typingElement.textContent = currentText.substring(0, charIndex);
  if (!isDeleting && charIndex < currentText.length) {
    charIndex++; setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--; setTimeout(typeEffect, 60);
  } else {
    if (!isDeleting) { isDeleting = true; setTimeout(typeEffect, 1200); }
    else { isDeleting = false; roleIndex++; setTimeout(typeEffect, 200); }
  }
}
typeEffect();

// -------------------- Contact Form + Toast --------------------
const contactForm = document.getElementById("contact-form");
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.className = "show " + type;
  toast.textContent = message;
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (name.length < 2) return showToast("Please enter a valid name.", "error");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showToast("Please enter a valid email.", "error");
  if (message.length < 10) return showToast("Message must be at least 10 characters.", "error");
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: name, from_email: email, message: message
  }).then(
    () => { showToast("✅ Message sent successfully!", "success"); contactForm.reset(); },
    () => { showToast("❌ Failed to send. Please try again.", "error"); }
  );
});

// -------------------- Back to Top --------------------
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// -------------------- Preloader --------------------
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hidden"), 800);
});
