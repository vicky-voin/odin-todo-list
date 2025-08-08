import EventEmitter from "events";

export class ProjectButton
{
    #badgeValue;

    #domRoot;
    get domObject() {return this.#domRoot};

    constructor(project, document)
    {
        const button = document.createElement('button');
        button.className = "project-item";

        const title = document.createElement('div');
        title.className = "project-item-name";
        title.textContent = project.title;

        const badge = document.createElement('div');
        badge.className = "badge";

        this.#badgeValue = document.createElement('div');
        this.#badgeValue.className = "badge-value";
        this.#badgeValue.textContent = project.getToDos().length;

        badge.appendChild(this.#badgeValue);
        button.appendChild(title);
        button.appendChild(badge);

        this.#domRoot = button;

        this.eventEmitter = new EventEmitter();
        button.addEventListener('click', () => {this.eventEmitter.emit('click')})
        project.eventEmitter.on('sizeChanged', (count) => this.updateBadge(count));
    }

    updateBadge(count)
    {
        this.#badgeValue.textContent = count;
    }
}