// Header fixed
window.onscroll = function () {
  const docScrollTop = document.documentElement.scrollTop;

  if (window.innerWidth > 991) {
    if (docScrollTop > 100) {
      document.querySelector("header").classList.add("fixed");
    } else {
      document.querySelector("header").classList.remove("fixed");
    }
  }
};

// Navbar links
const navbar = document.querySelector(".navbar");
const navbarLinks = navbar.querySelectorAll("a");

navbarLinks.forEach(function (element) {
  element.addEventListener("click", function () {
    navbarLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    document.querySelector(".navbar").classList.toggle("show");
  });
});

// Hamburger menu
const hamBurger = document.querySelector(".hamburger");

hamBurger.addEventListener("click", function () {
  document.querySelector(".navbar").classList.toggle("show");
});

// Portfolio Gallery
const filterBtn = document.querySelector("#filterBtn").children;
const galleryItems = document.querySelector(".gallery").children;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    for (let j = 0; j < filterBtn.length; j++) {
      filterBtn[j].classList.remove("active");
    }
    this.classList.add("active");
    const target = this.getAttribute("data-target");
    for (let k = 0; k < galleryItems.length; k++) {
      galleryItems[k].style.display = "none";
      if (
        target == galleryItems[k].getAttribute("data-id") ||
        target == "all"
      ) {
        galleryItems[k].style.display = "block";
      }
    }
  });
}

const closeLightbox = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");

lightbox.addEventListener("click", function (event) {
  if (event.target != lightboxImg) {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
  }
});

closeLightbox.addEventListener("click", function () {
  lightbox.classList.remove("show");
  lightbox.classList.add("hide");
});

const gallery = document.querySelector(".gallery");

const galleryItems = document.querySelectorAll(".item");

galleryItems.forEach(function (element) {
  element.querySelector(".fa-plus").addEventListener("click", function () {
    lightbox.classList.remove("hide");
    lightbox.classList.add("show");
    lightboxImg.src = element.querySelector("img").getAttribute("src");
  });
});

// Testimonials Slider
const sliderContainer = document.querySelector(".testimonials-box");
const sliders = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;

const margin = 30;
let itemsPerSlide = 0;
let sliderDots;

const responsive = [
  {
    breakPoint: {
      width: 0,
      item: 1,
    },
  },
  {
    breakPoint: {
      width: 991,
      item: 2,
    },
  },
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      itemsPerSlide = responsive[i].breakPoint.item;
    }
  }
  start();
}

function start() {
  let totalWidth = 0;
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].style.width = containerWidth / itemsPerSlide - margin + "px";
    sliders[i].style.margin = margin / 2 + "px";
    totalWidth += containerWidth / itemsPerSlide;
  }
  sliderContainer.style.width = totalWidth + "px";

  sliderDots = Math.ceil(sliders.length / itemsPerSlide);

  for (let i = 0; i < sliderDots; i++) {
    const div = document.createElement("div");
    div.id = i;
    div.setAttribute("onclick", "controlSlide(this)");
    if (i == 0) {
      div.classList.add("active");
    }
    document.querySelector(".slider").appendChild(div);
  }
}

let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element) {
  clearInterval(timer);
  timer = setInterval(autoPlay, 5000);
  autoSlide = element.id;
  currentSlide = element.id;
  changeSlide(currentSlide);
}

function changeSlide(currentSlide) {
  const controlButtons = document.querySelector(".slider").children;
  for (let i = 0; i < controlButtons.length; i++) {
    controlButtons[i].classList.remove("active");
  }
  controlButtons[currentSlide].classList.add("active");

  sliderContainer.style.marginLeft = -(containerWidth * currentSlide) + "px";
}

function autoPlay() {
  if (autoSlide == sliderDots - 1) {
    autoSlide = 0;
  } else {
    autoSlide++;
  }
  changeSlide(autoSlide);
}
let timer = setInterval(autoPlay, 5000);

window.onload = load();

// Footer Year
const year = document.getElementById("year");
if (year) {
  year.innerHTML = new Date().getFullYear();
}

// Contact Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Here you can handle form data and perform the submission (e.g., AJAX request)
    // For now, we'll just show the success message

    successMessage.style.display = "block"; // Show success message
    form.reset(); // Optional: Clear the form fields
  });
});
