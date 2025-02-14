// Toggle sidebar navigation
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");

    // Change menu icon
    var icon = document.getElementById("menu-toggle");
    if (sidebar.classList.contains("active")) {
        icon.innerHTML = "✖";
    } else {
        icon.innerHTML = "☰";
    }
}

// Function to switch sections
function showSection(sectionId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    // Close sidebar menu on mobile
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("active");
    document.getElementById("menu-toggle").innerHTML = "☰";
}