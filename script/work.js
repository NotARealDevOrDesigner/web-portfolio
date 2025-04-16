document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("filter-active");
  const filterLinks = document.querySelector(".filter-links");
  const filterTabOut = document.querySelector(".filter-tab-out");
  const mobileFilter = document.querySelector(".mobile-category-filter");
  const mediaQuery = window.matchMedia("(max-width: 1050px)");

  function toggleDropdown() {
    if (checkbox.checked) {
      filterLinks.style.maxHeight = filterLinks.scrollHeight + "px";
      filterLinks.style.opacity = 1;


      if (filterTabOut) {
        filterTabOut.style.display = "inline";
      }

    } else {
      filterLinks.style.maxHeight = "0px";
      filterLinks.style.opacity = 0;

      if (filterTabOut) {
        filterTabOut.style.display = "none";
      }

    }
  }

  function handleMediaQuery(e) {
    if (e.matches) {
      checkbox.addEventListener("change", toggleDropdown);
      toggleDropdown();

      if (filterTabOut) {
        filterTabOut.addEventListener("click", () => {
          checkbox.checked = false;
          toggleDropdown();
        });
      }
    } else {
      checkbox.removeEventListener("change", toggleDropdown);
      filterLinks.style.maxHeight = "";
      filterLinks.style.opacity = "";

      if (filterTabOut) {
        filterTabOut.style.display = "";
      }
    }
  }

  handleMediaQuery(mediaQuery);
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
  