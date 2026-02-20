const menuToggle = document.getElementById("menuToggle");
const panelOps = document.getElementById("panelOps");
const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

function setMenuState(isOpen) {
    panelOps.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function toggleMenu() {
    if (!mobileBreakpoint.matches) {
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

menuToggle.addEventListener("click", toggleMenu);
menuToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
    }
});
window.addEventListener("resize", closeMenuOnDesktop);
