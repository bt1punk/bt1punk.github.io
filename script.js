document.addEventListener("DOMContentLoaded", function () {
    // Get saved section & theme mode
    const savedSection = localStorage.getItem("activeSection") || "home";
    const savedTheme = localStorage.getItem("themeMode") || "light";

    // Apply saved section and theme
    navigateTo(savedSection);
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});

function navigateTo(sectionId) {
    // Remove active class from all sections
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    // Delay to allow smooth transition
    setTimeout(() => {
        document.getElementById(sectionId).classList.add("active");
    }, 50);

    // Save last visited section
    localStorage.setItem("activeSection", sectionId);

    // Close mobile menu after clicking
    document.getElementById("navLinks").classList.remove("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    // Save dark mode state
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("themeMode", "dark");
    } else {
        localStorage.setItem("themeMode", "light");
    }
}