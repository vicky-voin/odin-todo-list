import "./todoView.css"
import {ToDoButton} from "../components/projectView/todoItem"

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
        
        const title = document.createElement('h1');
        title.className = "todo-title";
        title.textContent = todo.title;

        const description = document.createElement('div');
        description.className = "todo-description";
        description.textContent = todo.description;

        //TODO: replace with a tag object
        const priority = document.createElement('span');
        priority.className = "todo-priority";
        priority.textContent = todo.priority;

        const stepsList = document.createElement('div');
        stepsList.className = 'steps-list';

        todo.steps.forEach(step => {
            let stepItem = new ToDoButton(step, document);
            this.#steps.push(stepItem);
            stepsList.appendChild(stepItem.domObject);
        });

        this.#domObject.appendChild(title);
        title.appendChild(priority);
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