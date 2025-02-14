document.addEventListener("DOMContentLoaded", function () {
    const savedSection = window.location.hash.substring(1); // Get section from URL
    if (savedSection) {
        navigateTo(savedSection);
    } else {
        navigateTo("home"); // Default to home
    }
});

function navigateTo(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    setTimeout(() => {
        document.getElementById(sectionId).classList.add("active");
    }, 50);

    // Update URL without reloading
    window.location.hash = sectionId;

    // Close mobile menu after clicking
    document.getElementById("navLinks").classList.remove("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}