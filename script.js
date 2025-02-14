function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');

    // Update URL without refreshing
    history.pushState({ section: sectionId }, "", `#${sectionId}`);
}

// Handle back/forward navigation
window.addEventListener("popstate", function(event) {
    if (event.state && event.state.section) {
        showSection(event.state.section);
    }
});

// Load the section from the URL on first visit
document.addEventListener("DOMContentLoaded", function () {
    const sectionFromURL = window.location.hash.replace("#", "") || "home";
    showSection(sectionFromURL);
});