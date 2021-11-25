"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector(".navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--colored");
  } else {
    navbar.classList.remove("navbar--colored");
  }
});
