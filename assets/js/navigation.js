document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  if (!navbar || !navigation) return;

  const mobileQuery = window.matchMedia("(max-width: 700px) and (hover: none) and (pointer: coarse)");
  let toggle;

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation menu");
  };

  const createToggle = () => {
    toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", navigation.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    toggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    navbar.insertBefore(toggle, navigation);
  };

  const setNavigationMode = () => {
    const isMobile = mobileQuery.matches;
    if (isMobile && !toggle) {
      createToggle();
    } else if (!isMobile && toggle) {
      closeMenu();
      toggle.remove();
      toggle = undefined;
    }
  };

  setNavigationMode();
  mobileQuery.addEventListener("change", setNavigationMode);

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
});
