import "./todoView.css"
import {ToDoButton} from "../components/projectView/todoItem"
import { DropdownTag } from "../components/common/dropdownTag";
import { Priority } from "../todo";

export class TodoView
{
    #domObject;
    #steps = [];
    
    get domObject() {return this.#domObject};

    constructor(todo, document)
    {
        const root = document.createElement('div');
        root.className = 'todo-view';
        
        this.#domObject = root;

        this.show(todo);
    }

    show(todo)
    {
        this.clear();
        
        const header = document.createElement('div');
        header.className = "todo-header";

        const title = document.createElement('h1');
        title.className = "todo-title";
        title.textContent = todo.title;

        const priority = new DropdownTag([Priority.HIGH, Priority.MEDIUM, Priority.LOW], document);
        priority.domObject.classList.add("todo-priority");

        header.appendChild(title);
        header.appendChild(priority.domObject);

        const description = document.createElement('div');
        description.className = "todo-description";
        description.textContent = todo.description;

        const stepsList = document.createElement('div');
        stepsList.className = 'steps-list';

        todo.steps.forEach(step => {
            let stepItem = new ToDoButton(step, document);
            this.#steps.push(stepItem);
            stepsList.appendChild(stepItem.domObject);
        });

        this.#domObject.appendChild(header);
        this.#domObject.appendChild(description);
        this.#domObject.appendChild(stepsList);
    }

    clear()
    {
        this.#steps.forEach(stepItem => {
            if (stepItem.destroy) {
                stepItem.destroy();
            }
        });
        this.#steps = [];
        
        this.#domObject.innerHTML = '';
    }
}