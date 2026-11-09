
// ============================================
// MITUL — THE MOUNTAIN FILES
// Birthday Website JavaScript
// ============================================

// PERSONAL CONFIGURATION

const CONFIG = {
  name: "Mitul",

  birthdayWish:
    "May your life be full of beautiful views, fearless adventures, and people who feel like home."
};


// ============================================
// PERSONALISE WEBSITE
// ============================================

document.title =
  `${CONFIG.name.toUpperCase()} — The Mountain Files`;

document.querySelector(".finale-name").textContent =
  `HAPPY BIRTHDAY, ${CONFIG.name.toUpperCase()}!`;

document.querySelector(".finale-desc").textContent =
  CONFIG.birthdayWish;


// ============================================
// INTRO SCREEN ANIMATION
// ============================================

const gate = document.getElementById("gate");

document.body.classList.add("gate-active");

document.getElementById("openStory").addEventListener("click", () => {

  gate.classList.add("closed");

  document.body.classList.remove("gate-active");

  setTimeout(() => {
    gate.remove();
  }, 950);

});


// ============================================
// MOBILE NAVIGATION
// ============================================

const nav = document.getElementById("navLinks");

document.getElementById("navToggle").addEventListener("click", () => {

  nav.classList.toggle("open");

});

nav.querySelectorAll("a").forEach(a => {

  a.addEventListener("click", () => {

    nav.classList.remove("open");

  });

});


// ============================================
// SCROLL PROGRESS BAR
// ============================================

const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  progress.style.width =
    `${max > 0 ? window.scrollY / max * 100 : 0}%`;

}, { passive: true });


// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observer = new IntersectionObserver((entries, obs) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      obs.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => {

  observer.observe(el);

});


// ============================================
// INTERACTIVE PHOTO GALLERY
// ============================================

const lightbox = document.getElementById("lightbox");

const lightboxImg =
  document.getElementById("lightboxImg");

const lightboxTitle =
  document.getElementById("lightboxTitle");


function closeLightbox() {

  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  lightboxImg.src = "";

}


document.querySelectorAll(".memory-card").forEach(card => {

  card.addEventListener("click", () => {

    lightboxImg.src = card.dataset.src;

    lightboxTitle.textContent =
      card.dataset.title;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");

  });

});


document.getElementById("closeLightbox").addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener("click", e => {

  if (e.target === lightbox) {
    closeLightbox();
  }

});


document.addEventListener("keydown", e => {

  if (e.key === "Escape") {
    closeLightbox();
  }

});


// ============================================
// BIRTHDAY CAKE — BLOW OUT THE CANDLES
// ============================================

const candleButtons =
  [...document.querySelectorAll(".candle")];

const cakeInstruction =
  document.getElementById("cakeInstruction");

const wishDone =
  document.getElementById("wishDone");


candleButtons.forEach(candle => {

  candle.addEventListener("click", () => {

    candle.classList.add("blown");

    candle.disabled = true;

    const remaining =
      candleButtons.filter(
        c => !c.classList.contains("blown")
      ).length;


    cakeInstruction.textContent = remaining
      ? `${remaining} FLAME${remaining === 1 ? "" : "S"} LEFT — YOU'VE GOT THIS!`
      : "ALL CANDLES OUT!";


    if (!remaining) {

      wishDone.hidden = false;

      burst(170);

    }

  });

});


// ============================================
// CONFETTI ANIMATION
// PURE VANILLA JAVASCRIPT
// ============================================

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

let bits = [];

let raf = null;


// Canvas sizing

function sizeCanvas() {

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width = innerWidth * dpr;

  canvas.height = innerHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

window.addEventListener("resize", sizeCanvas);

sizeCanvas();


// Create confetti particles

function burst(count = 240) {

  const palette = [
    "#e99a57",
    "#e6c58d",
    "#f0ece2",
    "#8eb7c6",
    "#d67c68"
  ];


  for (let i = 0; i < count; i++) {

    bits.push({

      x: Math.random() * innerWidth,

      y: -20 - Math.random() * innerHeight * .3,

      vx: -2.8 + Math.random() * 5.6,

      vy: 2 + Math.random() * 5,

      size: 4 + Math.random() * 7,

      spin: -8 + Math.random() * 16,

      angle: Math.random() * 360,

      color:
        palette[
          Math.floor(Math.random() * palette.length)
        ],

      life: 190 + Math.random() * 90,

      circle: Math.random() > .55

    });

  }


  if (!raf) {

    drawConfetti();

  }

}


// Animate particles

function drawConfetti() {

  ctx.clearRect(
    0,
    0,
    innerWidth,
    innerHeight
  );


  bits = bits.filter(b => {

    return b.life > 0 && b.y < innerHeight + 30;

  });


  bits.forEach(b => {

    b.x += b.vx;

    b.y += b.vy;

    b.vy += .025;

    b.angle += b.spin;

    b.life--;


    ctx.save();

    ctx.translate(b.x, b.y);

    ctx.rotate(b.angle * Math.PI / 180);

    ctx.fillStyle = b.color;


    if (b.circle) {

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        b.size / 2,
        0,
        Math.PI * 2
      );

      ctx.fill();

    } else {

      ctx.fillRect(
        -b.size / 2,
        -b.size / 3,
        b.size,
        b.size * .65
      );

    }


    ctx.restore();

  });


  if (bits.length) {

    raf = requestAnimationFrame(drawConfetti);

  } else {

    cancelAnimationFrame(raf);

    raf = null;

    ctx.clearRect(
      0,
      0,
      innerWidth,
      innerHeight
    );

  }

}


// ============================================
// BIRTHDAY CELEBRATION BUTTON
// ============================================

document.getElementById("celebrate").addEventListener(
  "click",
  () => {

    burst(360);

    const button =
      document.getElementById("celebrate");

    button.innerHTML =
      "HAPPY BIRTHDAY, MITUL! <b>✳</b>";

  }
);


// ============================================
// END OF SCRIPT
// ============================================
