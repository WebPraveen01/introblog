const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");

const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

// Open the mobile menu
function showMobileMenu() {
  nav.classList.add("mobile-open");
  overlay.classList.add("active");
  openMenu.setAttribute("aria-expanded", "true");
  closeMenu.focus();
}

// Close the mobile menu
function hideMobileMenu() {
  nav.classList.remove("mobile-open");
  overlay.classList.remove("active");
  openMenu.setAttribute("aria-expanded", "false");
  openMenu.focus();
}

// Mobile menu events
openMenu.setAttribute("aria-expanded", "false");
openMenu.addEventListener("click", showMobileMenu);

closeMenu.addEventListener("click", hideMobileMenu);
overlay.addEventListener("click", hideMobileMenu);

// Dropdown events


 // Dropdown events

dropdownButtons.forEach((button) => {
  button.setAttribute("aria-expanded", "false");

  const arrow = button.querySelector(".arrow");
  if (arrow) {
    arrow.textContent = "⌄";
  }

  button.addEventListener("click", () => {
    const currentList = button.nextElementSibling;
    const isOpen = currentList.classList.contains("show");

    // Close all dropdowns and reset their arrows
    document.querySelectorAll(".dropdown-list").forEach((list) => {
      list.classList.remove("show");
    });

    dropdownButtons.forEach((item) => {
      item.setAttribute("aria-expanded", "false");

      const itemArrow = item.querySelector(".arrow");
      if (itemArrow) {
        itemArrow.textContent = "⌄";
      }
    });

    // Open the clicked dropdown
    if (!isOpen) {
      currentList.classList.add("show");
      button.setAttribute("aria-expanded", "true");

      const arrow = button.querySelector(".arrow");

      if (arrow) {
        arrow.textContent = "⌃";
      }
    }
  });
});


 dropdownButtons.forEach((item) => {
  item.setAttribute("aria-expanded", "false");

  const arrow = item.querySelector(".arrow");

  if (arrow) {
    arrow.textContent = "⌄";
  }
});

// Close dropdowns when clicking outside them
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-link")) {
    document.querySelectorAll(".dropdown-list").forEach((list) => {
      list.classList.remove("show");
    });

    dropdownButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }
});

// Close menus with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".dropdown-list").forEach((list) => {
      list.classList.remove("show");
    });

    dropdownButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });

    if (nav.classList.contains("mobile-open")) {
      hideMobileMenu();
    }
  }
});

// Close mobile navigation after choosing a normal link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      nav.classList.remove("mobile-open");
      overlay.classList.remove("active");
      openMenu.setAttribute("aria-expanded", "false");
    }
  });
});

// Reset mobile navigation when returning to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("mobile-open");
    overlay.classList.remove("active");
    openMenu.setAttribute("aria-expanded", "false");
  }
});
