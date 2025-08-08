export class ProjectButton
{
    #button;

    constructor(project, document)
    {
        const button = document.createElement('button');
        button.className = "project-item";

        const title = document.createElement('div');
        title.className = "project-item-name";
        title.textContent = project.title;

        const badge = document.createElement('div');
        badge.className = "badge";

        const badgeValue = document.createElement('div');
        badgeValue.className = "badge-value";
        badgeValue.textContent = project.getToDos().length;

        badge.appendChild(badgeValue);
        button.appendChild(title);
        button.appendChild(badge);

        this.#button = button;

        return button;
    }
}