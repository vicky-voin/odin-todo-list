import EventEmitter from "events";
import { ViewComponent } from "../common/viewComponent";

export class ProjectButton extends ViewComponent
{
    #badgeValue;

    constructor(project, document)
    {
        super();

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

        this.__domObject = button;

        button.addEventListener('click', () => {this.__eventEmitter.emit('click')})
        project.eventEmitter.on('sizeChanged', (count) => this.updateBadge(count));
    }

    updateBadge(count)
    {
        this.#badgeValue.textContent = count;
    }
}