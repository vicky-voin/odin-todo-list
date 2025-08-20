import EventEmitter from "events";
import "./todoItem.css"
import { ViewComponent } from "../common/viewComponent";
import { DynamicTextArea } from "../common/dynamicTextArea";

export class ToDoButton extends ViewComponent
{
    #checkbox;
    #title;

    constructor(todo, isEditable, document)
    {
        super();

        this.__eventEmitter = new EventEmitter();

        const button = document.createElement('button');
        button.className = 'todo-item-button';
        button.addEventListener('click', () =>
        {
            this.__eventEmitter.emit('selected');
        })

        this.#checkbox = document.createElement('input');
        this.#checkbox.type = 'checkbox';
        this.#checkbox.className = "todo-item-checkbox";

        this.#title = isEditable? new DynamicTextArea(document).domObject : document.createElement('div');
        this.#title.classList.add("todo-item-title");
        this.#title.textContent = todo.title;

        button.appendChild(this.#checkbox);
        button.appendChild(this.#title);

        this.__domObject = button;

        this.#title.addEventListener('change', () => { 
            this.__eventEmitter.emit('textChanged', this.#title.textContent)
        });

        this.#checkbox.addEventListener('click', () => { 
            this.__eventEmitter.emit('checked', this.#checkbox.checked);
        });
    }

    setChecked(isChecked)
    {
        this.#checkbox.checked = isChecked;
    }

    setText(text)
    {
        this.#title.textContent = text;
    }
}