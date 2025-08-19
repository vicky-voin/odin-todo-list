import EventEmitter from "events";
import "./todoItem.css"
import { ViewComponent } from "../common/viewComponent";

export class ToDoButton extends ViewComponent
{
    constructor(todo, document)
    {
        super();

        this.__eventEmitter = new EventEmitter();

        const button = document.createElement('button');
        button.className = 'todo-item-button';
        button.addEventListener('click', () =>
        {
            this.__eventEmitter.emit('selected');
        })

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = "todo-item-checkbox";

        const title = document.createElement('div');
        title.className = "todo-item-title";
        title.textContent = todo.title;

        button.appendChild(checkbox);
        button.appendChild(title);

        this.__domObject = button;
    }
}