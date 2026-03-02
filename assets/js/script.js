'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// =============================================
// PAGE NAVIGATION — FIX PRINCIPAL
// Comparaison par index plutôt que par texte
// =============================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Trouver l'index du lien cliqué
    const clickedIndex = Array.from(navigationLinks).indexOf(this);

    for (let j = 0; j < pages.length; j++) {
      if (j === clickedIndex) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

    window.scrollTo(0, 0);
  });
}

// =============================================
// THEME COLOR PICKER
// =============================================
const themeBtn = document.getElementById('theme-btn');
const colorInput = document.getElementById('color-input');

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255;
  let g = parseInt(hex.slice(3,5),16)/255;
  let b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if(max===min){ h=s=0; }
  else {
    const d = max-min;
    s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h=((g-b)/d+(g<b?6:0))/6; break;
      case g: h=((b-r)/d+2)/6; break;
      case b: h=((r-g)/d+4)/6; break;
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

function applyColor(hex) {
  const [h, s, l] = hexToHsl(hex);
  const root = document.documentElement;
  root.style.setProperty('--orange-yellow-crayola', `hsl(${h}, ${s}%, ${l}%)`);
  root.style.setProperty('--vegas-gold', `hsl(${h}, ${Math.round(s*0.5)}%, ${Math.round(l*0.8)}%)`);
  root.style.setProperty('--text-gradient-yellow', `linear-gradient(to right, hsl(${h}, ${s}%, ${l}%), hsl(${h-10}, ${s}%, ${Math.round(l*0.95)}%))`);
  root.style.setProperty('--bg-gradient-yellow-1', `linear-gradient(to bottom right, hsl(${h}, ${s}%, ${l}%) 0%, hsla(${h-10}, ${s}%, ${Math.round(l*0.95)}%, 0) 50%)`);
  root.style.setProperty('--bg-gradient-yellow-2', `linear-gradient(135deg, hsla(${h}, ${s}%, ${l}%, 0.251) 0%, hsla(${h-10}, ${s}%, ${Math.round(l*0.95)}%, 0) 59.86%), hsl(240, 2%, 13%)`);
  if (themeBtn) themeBtn.style.background = hex;
  if (colorInput) colorInput.value = hex;
  localStorage.setItem('themeColor', hex);
}

if (colorInput) colorInput.addEventListener('input', e => applyColor(e.target.value));
if (themeBtn) themeBtn.addEventListener('click', () => colorInput.click());

// Restaurer couleur sauvegardée
const savedColor = localStorage.getItem('themeColor');
if (savedColor) applyColor(savedColor);