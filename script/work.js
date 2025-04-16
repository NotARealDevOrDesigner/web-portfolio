document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("filter-active");
  const filterLinks = document.querySelector(".filter-links");
  const mediaQuery = window.matchMedia("(max-width: 1050px)");

  // Funktion zur Steuerung des Dropdowns
  function toggleDropdown() {
    if (checkbox.checked) {
      filterLinks.style.maxHeight = filterLinks.scrollHeight + "px";
      filterLinks.style.opacity = 1;
    } else {
      filterLinks.style.maxHeight = "0px";
      filterLinks.style.opacity = 0;
    }
  }

  // Initial + bei Änderung
  function handleMediaQuery(e) {
    if (e.matches) {
      // Aktivieren
      checkbox.addEventListener("change", toggleDropdown);
      toggleDropdown(); // Zustand sofort anwenden
    } else {
      // Reset + Deaktivieren
      checkbox.removeEventListener("change", toggleDropdown);
      filterLinks.style.maxHeight = "";
      filterLinks.style.opacity = "";
    }
  }

  // Initial prüfen
  handleMediaQuery(mediaQuery);
  // Bei Fenstergrößenwechsel neu prüfen
  mediaQuery.addEventListener("change", handleMediaQuery);
});



document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-link");
    const items = document.querySelectorAll(".card-item");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
  
        // Aktive Klasse setzen
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        // 1. Alle ausblenden (mit animation)
        items.forEach(item => {
          item.classList.add("hide");
        });
  
        // 2. Nach Animation (z. B. 300ms) – nur passende anzeigen
        setTimeout(() => {
          items.forEach(item => {
            // zuerst komplett aus dem Layout
            item.style.display = "none";
  
            const matchesFilter = filterValue === "*" || item.classList.contains(filterValue.slice(1));
  
            if (matchesFilter) {
              item.style.display = "block"; // kommt ins Layout
              requestAnimationFrame(() => {
                item.classList.remove("hide"); // fade-in
              });
            }
          });
        }, 300); // Timing = CSS-Transition-Time
      });
    });
  });
  