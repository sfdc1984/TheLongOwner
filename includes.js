document.addEventListener("DOMContentLoaded", async () => {

    async function loadComponent(id, file) {

        const element = document.getElementById(id);

        if (!element) return;

        const response = await fetch(file);

        if (!response.ok) {
            console.error(`Couldn't load ${file}`);
            return;
        }

        element.innerHTML = await response.text();

    }

    loadComponent("site-header", "components/header.html");
    loadComponent("site-footer", "components/footer.html");

});
