function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            history.pushState({ page: page }, "", page);
        })
        .catch(error => console.error("Error loading page:", error));
}

// Handle back/forward navigation
window.addEventListener("popstate", function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
});

// Load default page on first visit
document.addEventListener("DOMContentLoaded", function () {
    loadPage("home.html");
});