document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list");
    const loadLocalBtn = document.createElement("button");
    const loadRemoteBtn = document.createElement("button");
    
    loadLocalBtn.textContent = "Load Local";
    loadRemoteBtn.textContent = "Load Remote";
    
    document.body.insertBefore(loadLocalBtn, projectList);
    document.body.insertBefore(loadRemoteBtn, projectList);
    
    const localKey = "projects";
    const remoteURL = "https://api.jsonbin.io/v3/qs/67d6a5ae8a456b796676d281";
    
    class ProjectCard extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
    
        connectedCallback() {
            this.render();
        }
    
        static get observedAttributes() {
            return ["title", "image", "description", "link"];
        }
    
        attributeChangedCallback() {
            this.render();
        }
    
        render() {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        padding: 16px;
                        margin: 16px;
                        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                        max-width: 350px;
                        background: white;
                        font-family: Arial, sans-serif;
                    }
                    h2 {
                        font-size: 1.2em;
                        margin-bottom: 8px;
                    }
                    picture img {
                        width: 50%;
                        height: auto;
                        border-radius: 5px;
                    }
                    p {
                        font-size: 1em;
                        color: #333;
                    }
                    a {
                        display: block;
                        margin-top: 8px;
                        color: #007bff;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
                <h2>${this.getAttribute("title") || "Untitled Project"}</h2>
                <picture>
                    <img src="${this.getAttribute("image") || "placeholder.jpg"}" 
                         alt="${this.getAttribute("title") || "Project image"}">
                </picture>
                <p>${this.getAttribute("description") || "No description available."}</p>
                <a href="${this.getAttribute("link") || "#"}" target="_blank">Learn More</a>
            `;
        }
    }
    
    customElements.define("project-card", ProjectCard);
    
    function createProjectCard(project) {
        const card = document.createElement("project-card");
        card.setAttribute("title", project.name);
        card.setAttribute("image", project.image || "placeholder.jpg");
        card.setAttribute("description", project.description);
        card.setAttribute("link", project.link);
        return card;
    }
    
    function loadProjects(data) {
        projectList.innerHTML = "";
        data.forEach(project => {
            projectList.appendChild(createProjectCard(project));
        });
    }
    
    loadLocalBtn.addEventListener("click", () => {
        const localData = localStorage.getItem(localKey);
        if (localData) {
            loadProjects(JSON.parse(localData));
        } else {
            alert("No local data found!");
        }
    });
    
    loadRemoteBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(remoteURL);
            if (!response.ok) {
                throw new Error("Failed to fetch remote data");
            }
            const jsonResponse = await response.json();
            const data = jsonResponse.record || [];
            loadProjects(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load remote projects");
        }
    });
    
    // Sample localStorage data for testing
    if (!localStorage.getItem(localKey)) {
        const sampleData = [
            { name: "MiniMips", image: "/assets/minimips.png", description: "A project where me and a team build a miniture version of mips", link: "https://github.com/Eban-Covarrubias/miniMips_ComputerArchitecture" },
            { name: "Work Journal Website", image: "/assets/workjournal.png", description: "A gen z work journal I worked on with a team of 10 to practice agile and CD/CI methodologies", link: "https://github.com/cse110-sp24-group19/final-project" }
        ];
        localStorage.setItem(localKey, JSON.stringify(sampleData));
    }
});