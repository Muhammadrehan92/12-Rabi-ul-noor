document.addEventListener("DOMContentLoaded", function () {
    const filterBtns = document.querySelectorAll(".gallery-filter button");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Lightbox Elements
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    // Category Filter Functionality
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all filter buttons
            filterBtns.forEach((b) => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            galleryItems.forEach((item) => {
                const category = item.getAttribute("data-category");

                if (filterValue === "all" || filterValue === category) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    // Lightbox Image Popup Functionality
    galleryItems.forEach((item) => {
        const img = item.querySelector("img");
        if (img) {
            img.addEventListener("click", () => {
                if (lightbox && lightboxImg) {
                    lightbox.classList.add("active");
                    lightboxImg.src = img.src;
                }
            });
        }
    });

    if (closeBtn && lightbox) {
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }
});