const Slide = document.querySelector(".m_slider");
const Images = document.querySelectorAll(".m_slider img");
//buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = Images[0].clientWidth;

Slide.style.transform = "translateX(" + -size * counter + "px)";
myBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("m_slider");
  const slides = document.querySelectorAll(".m_slide");
  const prevBtn = document.getElementById("m_prev");
  const nextBtn = document.getElementById("m_next");

  let counter = 0;

  function showSlide(index) {
    if (index >= slides.length) counter = 0;
    if (index < 0) counter = slides.length - 1;
    slider.style.transform = `translateX(-${counter * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    counter++;
    showSlide(counter);
  });

  prevBtn.addEventListener("click", () => {
    counter--;
    showSlide(counter);
  });

  setInterval(() => {
    counter++;
    showSlide(counter);
  }, 5000);
});
// ====================

let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}

// ====================navbar change color=======================
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("sh_header");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
