// Toggle mobile menu and change hamburger to cross
function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    var icon = document.getElementById("menu-icon");

    menu.classList.toggle("active");

    // Change icon based on menu state
    if (menu.classList.contains("active")) {
        icon.innerHTML = "✖"; // Change to cross
    } else {
        icon.innerHTML = "☰"; // Change back to hamburger
    }
}

// Function to show selected section smoothly
function showSection(sectionId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Activate selected section
    var activeSection = document.getElementById(sectionId);
    activeSection.classList.add("active");

    // Close mobile menu after selection
    var menu = document.getElementById("nav-menu");
    var icon = document.getElementById("menu-icon");
    menu.classList.remove("active");
    icon.innerHTML = "☰"; // Reset icon to hamburger
}