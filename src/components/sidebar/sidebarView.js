import "./sidebarView.css"
import { ProjectButton } from "./projectButton";
import logoSvg from "../../img/check-circle.svg";

export class SidebarView
{
    #domObject;

    constructor(library, document)
    {
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

        const projects = document.createElement('div');
        projects.className = 'projects-root';

        const projectsSectionTitle = document.createElement('div');
        projectsSectionTitle.textContent = 'My Projects';
        projectsSectionTitle.className = 'projects-title';

        projects.appendChild(projectsSectionTitle);

        library.getProjects().forEach(project => {
            const projectButton = new ProjectButton(project, document);
            projects.appendChild(projectButton);
        });

        logo.appendChild(logoImg);
        logo.appendChild(logoText);

        root.appendChild(logo);
        root.appendChild(projects);

        this.#domObject = root;

        return root;
    }
}