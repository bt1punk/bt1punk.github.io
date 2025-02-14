document.addEventListener("DOMContentLoaded", function() {
    function loadPage(page) {
        fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        }).catch(err => console.error("Error loading page:", err));
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href");
            loadPage(page);
            history.pushState({ page }, "", page);
        });
    });

    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.page) {
            loadPage(event.state.page);
        }
    });

    loadPage("home");
});