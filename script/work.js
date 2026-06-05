document.addEventListener("DOMContentLoaded", () => {

    // Nav scroll effect — adds .scrolled class to header
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 10);
        }, { passive: true });
    }

    // Filter with staggered card animation
    const filterButtons = document.querySelectorAll(".filter-link");
    const items = document.querySelectorAll(".card-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Fade out all
            items.forEach(item => item.classList.add("hide"));

            setTimeout(() => {
                let delay = 0;
                items.forEach(item => {
                    const matches = filterValue === "*" ||
                        item.classList.contains(filterValue.slice(1));

                    if (matches) {
                        item.style.display = "block";
                        item.style.transitionDelay = `${delay}ms`;
                        requestAnimationFrame(() => item.classList.remove("hide"));
                        delay += 45;
                    } else {
                        item.style.display = "none";
                        item.style.transitionDelay = "";
                    }
                });
            }, 280);
        });
    });
});
