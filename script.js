function navigateTo(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    setTimeout(() => {
        document.getElementById(sectionId).classList.add("active");
    }, 50);

    // Close mobile menu when a link is clicked
    document.getElementById("navLinks").classList.remove("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}