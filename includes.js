document.addEventListener("DOMContentLoaded", () => {

    fetch("components/footer.html")
        .then(response => response.text())
        .then(html => {
            const footer = document.getElementById("footer");
            if (footer) {
                footer.innerHTML = html;
            }
        });

});
