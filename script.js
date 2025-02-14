// Toggle mobile menu and change hamburger to cross
function toggleMenu() {
    let menu = document.getElementById("nav-menu");
    let icon = document.getElementById("menu-icon");

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
        page.style.display = "none";
    });

    // Activate selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = "block";

    // Delay adding the class for smooth transition
    setTimeout(() => {
        activeSection.classList.add("active");
    }, 10);

    // Close mobile menu after selection
    let menu = document.getElementById("nav-menu");
    let icon = document.getElementById("menu-icon");
    menu.classList.remove("active");
    icon.innerHTML = "☰"; // Reset icon to hamburger
}