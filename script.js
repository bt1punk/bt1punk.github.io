document.addEventListener("DOMContentLoaded", function () {
    const savedSection = localStorage.getItem("activeSection") || "home";
    navigateTo(savedSection, false); // Load last section on page load
});

function navigateTo(sectionId, save = true) {
    // Prevent navigating to non-existing sections
    const section = document.getElementById(sectionId);
    if (!section) return;

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    setTimeout(() => {
        section.classList.add("active");
    }, 50);

    // Save last visited section if needed
    if (save) {
        localStorage.setItem("activeSection", sectionId);
    }

    // Close mobile menu after clicking a link
    document.getElementById("navLinks").classList.remove("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}