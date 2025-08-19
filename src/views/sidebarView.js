import "./sidebarView.css"
import { ProjectButton } from "../components/sidebar/projectButton";
import logoSvg from "../img/check-circle.svg";
import EventEmitter from "events";
import { ViewComponent } from "../components/common/viewComponent";

export class SidebarView extends ViewComponent
{
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

        const projects = document.createElement('div');
        projects.className = 'projects-root';

        const projectsSectionTitle = document.createElement('h3');
        projectsSectionTitle.textContent = 'My Projects';
        projectsSectionTitle.className = 'projects-title';

        projects.appendChild(projectsSectionTitle);

        library.getProjects().forEach(project => {
            const projectButton = new ProjectButton(project, document);
            projectButton.eventEmitter.on('click', () => {
                this.__eventEmitter.emit('projectSelected', project);
            })
            projects.appendChild(projectButton.domObject);
        });

        logo.appendChild(logoImg);
        logo.appendChild(logoText);

        root.appendChild(logo);
        root.appendChild(projects);

        this.__domObject = root;
    }
}