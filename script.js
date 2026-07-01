const circles = document.querySelectorAll(".circle");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const circle = entry.target;
      const span = circle.querySelector("span");

      let target = 0;

      if (circle.classList.contains("html")) target = 95;
      if (circle.classList.contains("css")) target = 95;
      if (circle.classList.contains("js")) target = 85;
      if (circle.classList.contains("bootstrap")) target = 90;
      if (circle.classList.contains("writer")) target = 97;
      if (circle.classList.contains("figma")) target = 95;

      let count = 0;

      const interval = setInterval(() => {
        count++;

        span.innerText = count + "%";

        circle.style.background = `conic-gradient(#9f92a8 ${count * 3.6}deg, #e5e5e5 0deg)`;

        if (count >= target) {
          clearInterval(interval);
        }
      }, 20);

      observer.unobserve(circle);
    }
  });
});

circles.forEach((circle) => observer.observe(circle));

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar-collapse");

    if (navbar.classList.contains("show")) {
      bootstrap.Collapse.getInstance(navbar).hide();
    }
  });
});

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


// ================= WHATSAPP BUTTON =================
const whatsappBtn = document.getElementById("whatsappBtn");

window.addEventListener("scroll", function () {
  if (!whatsappBtn) return;

  whatsappBtn.style.display = window.scrollY > 200 ? "flex" : "none";
});


// ================= CAPTCHA =================
let captchaValue = "";

function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captchaValue = "";

    for (let i = 0; i < 6; i++) {
        captchaValue += chars[Math.floor(Math.random() * chars.length)];
    }

    const el = document.getElementById("captchaText");

    if (el) {
        el.innerText = "CAPTCHA: " + captchaValue;
    }
}


// run after page load
window.addEventListener("load", function () {
    generateCaptcha();
});


// ================= CONTACT FORM =================
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const msgBox = document.getElementById("captchaMessage");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        let userCaptcha = document.getElementById("captchaInput").value;

        // ❌ WRONG CAPTCHA
        if (userCaptcha !== captchaValue) {

            if (msgBox) {
                msgBox.innerText = "Wrong CAPTCHA. Try again!";
                msgBox.className = "error";
            }

            document.getElementById("captchaInput").value = "";
            generateCaptcha();
            return;
        }

        // ================= WHATSAPP SEND =================
        let number = "919403248404";

        let text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        window.open(
            "https://wa.me/" + number + "?text=" + encodeURIComponent(text),
            "_blank"
        );

        // ================= RESET EVERYTHING =================
        form.reset();

        setTimeout(() => {
            generateCaptcha();
            document.getElementById("captchaInput").value = "";

            if (msgBox) {
                msgBox.innerText = "";
                msgBox.className = "";
            }
        }, 50);
    });

});