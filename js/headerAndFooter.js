document.addEventListener("DOMContentLoaded", script);

function script() {
    const basePath = getComponentBasePath();
    loadComponent(basePath + "header.html", "header-container", loadNavLogic);
    loadComponent(basePath + "footer.html", "footer-container");
}

function getComponentBasePath() {
    const path = window.location.pathname;
    if (path.includes("/pages/")) {
        return "../components/";
    }
    return "components/";
}

function loadComponent(url, containerID, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(containerID);
            if (!container) throw new Error(`Container with id ${containerID} not found.`);
            container.innerHTML = data;
            if (callback) requestAnimationFrame(callback);
        })
        .catch(error => console.error(error));
}

function loadNavLogic() {
    const index = document.getElementById('index');
    const fires = document.getElementById('fires');
    const sirens = document.getElementById('sirens');

    if (index) {
        index.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = "/FrontendEksamen/index.html";
        });
    }
    if (fires) {
        fires.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = "/FrontendEksamen/pages/overview-of-fires.html";
        });
    }
    if (sirens) {
        sirens.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = "/FrontendEksamen/pages/overview-of-sirens.html";
        });
    }
}
