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

// Define the custom element
customElements.define("project-card", ProjectCard);

// Function to fetch projects and populate the page
function loadProjects() {
    const projectList = document.getElementById("project-list");

    // Load from localStorage (if available)
    const localProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    localProjects.forEach(addProjectCard);

    // Fetch remote JSON file
    fetch("/assets/projects.json")
        .then(response => response.json())
        .then(remoteProjects => {
            remoteProjects.forEach(addProjectCard);
        })
        .catch(error => console.error("Error fetching projects:", error));
}

// Function to create and insert project cards
function addProjectCard(project) {
    const card = document.createElement("project-card");
    card.setAttribute("title", project.title);
    card.setAttribute("image", project.image);
    card.setAttribute("description", project.description);
    card.setAttribute("link", project.link);
    
    document.getElementById("project-list").appendChild(card);
}

// Load projects on page load
window.addEventListener("DOMContentLoaded", loadProjects);
