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

// Navbar toggle button for small screen

const navbarToggleButton = document.querySelector(".navbar__toggle-btn");
navbarToggleButton.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// handle click on "contact me" button on home
const homeContactButton = document.querySelector(".home__contact");
homeContactButton.addEventListener("click", () => {
  const scrollTo = document.querySelector(".contact");
  scrollIntoView(".contact");
});

// scrollIntoView Function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "auto" });
  navbarMenu.classList.remove("open");
}

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow--up");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView(".home");
});

// filter project data

const workButtonContainer = document.querySelector(".work__category");
const projectContainer = document.querySelector(".work__project");
const projects = document.querySelectorAll(".project");

workButtonContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Revmove selection from the previous item and select the new none
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  e.target.classList.add("selected");

  projectContainer.classList.add("anime--out");
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anime--out");
  }, 500);
});

// IntersectionObserver
// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴아이템을 활성화 시킨다

const sectionIds = [
  ".home",
  ".about",
  ".skill",
  ".work",
  ".testimonials",
  ".contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavItem = navItems[0];

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.IntersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.class}`);
      let selectedIndex;
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClient.y < 0) {
        selectedIndex = index + 1;
      } else {
        selectedIndex = index - 1;
      }
      selectedNavItem.classList.remove("active");
      selectedNavItem = navItem(selectedIndex);
      selectedNavItem.classList.add("active");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));
