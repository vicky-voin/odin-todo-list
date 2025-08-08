import "./todoItem.css"

export class ToDoButton
{
    #domObject;
    get domObject() {return this.#domObject};

    constructor(todo, document)
    {
        const button = document.createElement('button');
        button.className = 'todo-item-button';

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