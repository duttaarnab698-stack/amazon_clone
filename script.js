const menuToggle = document.getElementById("menuToggle");
const panelOps = document.getElementById("panelOps");
const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
const backToTopButton = document.querySelector(".foot-panel1");
const heroPrimaryCta = document.querySelector(".hero-primary");
const shopCards = document.querySelectorAll(".box");

function setMenuState(isOpen) {
    if (!menuToggle || !panelOps) {
        return;
    }

    panelOps.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function toggleMenu() {
    if (!mobileBreakpoint.matches || !panelOps) {
        return;
    }

    const isOpen = !panelOps.classList.contains("is-open");
    setMenuState(isOpen);
}

function closeMenuOnDesktop() {
    if (!mobileBreakpoint.matches) {
        setMenuState(false);
    }
}

function handleDocumentClick(event) {
    if (!mobileBreakpoint.matches || !panelOps || !menuToggle) {
        return;
    }

    const clickedInsideMenu = panelOps.contains(event.target) || menuToggle.contains(event.target);
    if (!clickedInsideMenu) {
        setMenuState(false);
    }
}

function handleEscapeKey(event) {
    if (event.key === "Escape") {
        setMenuState(false);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToShop(event) {
    const targetId = event.currentTarget.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) {
        return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function revealCards() {
    shopCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
        card.style.transition = `opacity 420ms ease ${index * 70}ms, transform 420ms ease ${index * 70}ms`;
    });

    requestAnimationFrame(() => {
        shopCards.forEach((card) => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });
    });
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
    menuToggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        }
    });
}

window.addEventListener("resize", closeMenuOnDesktop);
document.addEventListener("click", handleDocumentClick);
document.addEventListener("keydown", handleEscapeKey);

if (backToTopButton) {
    backToTopButton.style.cursor = "pointer";
    backToTopButton.addEventListener("click", scrollToTop);
}

if (heroPrimaryCta) {
    heroPrimaryCta.addEventListener("click", scrollToShop);
}

if (shopCards.length > 0) {
    revealCards();
}
