import "./sidebarView.css"
import { ProjectButton } from "../components/sidebar/projectButton";
import logoSvg from "../img/check-circle.svg";
import EventEmitter from "events";
import { ViewComponent } from "../components/common/viewComponent";
import { AddItemButton } from "../components/common/addItemButton";

export class SidebarView extends ViewComponent
{
    #projects;

    constructor(library, document)
    {
        super();
        
        const root = document.createElement('div');
        root.className = 'sidebar';

        const logo = document.createElement('div');
        logo.className = 'logo-root';

        const logoImg = document.createElement('img');
        logoImg.src = logoSvg;
        logoImg.className = "logo";

        const logoText = document.createElement('div');
        logoText.textContent = 'ToDoAble';
        logoText.className = "logo-text";

        this.#projects = document.createElement('div');
        this.#projects.className = 'projects-root';

        this.refreshProjectList(document, library);

        const addProjectButton = new AddItemButton(document);
        addProjectButton.domObject.classList.add("add-project-button");
        addProjectButton.eventEmitter.on('submit', (newItem) => 
        {
            this.eventEmitter.emit('addNewProject', newItem);
        });

        logo.appendChild(logoImg);
        logo.appendChild(logoText);

        root.appendChild(logo);
        root.appendChild(this.#projects);
        root.appendChild(addProjectButton.domObject);

        this.__domObject = root;
    }

    refreshProjectList(document, library)
    {
        this.#projects.innerHTML = '';

        const projectsSectionTitle = document.createElement('h3');
        projectsSectionTitle.textContent = 'My Projects';
        projectsSectionTitle.className = 'projects-title';

        this.#projects.appendChild(projectsSectionTitle);

        library.getProjects().forEach(project => {
            const projectButton = new ProjectButton(project, document);
            projectButton.eventEmitter.on('click', () => {
                this.__eventEmitter.emit('projectSelected', project);
            })
            this.#projects.appendChild(projectButton.domObject);
        });
    }
}