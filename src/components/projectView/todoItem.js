import EventEmitter from "events";
import "./todoItem.css"

export class ToDoButton
{
    #eventEmitter
    get eventEmitter() { return this.#eventEmitter; }

    #domObject;
    get domObject() { return this.#domObject };

    constructor(todo, document)
    {
        this.#eventEmitter = new EventEmitter();

        const button = document.createElement('button');
        button.className = 'todo-item-button';
        button.addEventListener('click', () =>
        {
            this.#eventEmitter.emit('selected');
        })

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = "todo-item-checkbox";

        const title = document.createElement('div');
        title.className = "todo-item-title";
        title.textContent = todo.title;

        button.appendChild(checkbox);
        button.appendChild(title);

        this.#domObject = button;
    }
}