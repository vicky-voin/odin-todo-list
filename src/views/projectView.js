import "./projectView.css"
import { ToDoButton } from "../components/projectView/todoItem";

export class ProjectView
{
    #domObject;
    #todoItems = []; // Store references to todo items
    
    get domObject() {return this.#domObject};

    constructor(project, document)
    {
        const root = document.createElement('div');
        root.className = 'project-view';
        
        this.#domObject = root;

        this.show(project);
    }

    show(project)
    {
        // Clear existing content first
        this.clear();
        
        const title = document.createElement('h1');
        title.className = "project-title";
        title.textContent = project.title;

        const todosList = document.createElement('div');
        todosList.className = 'todos-list';

        project.getToDos().forEach(todo => {
            let todoItem = new ToDoButton(todo, document);
            this.#todoItems.push(todoItem); // Store reference
            todosList.appendChild(todoItem.domObject);
        });

        this.#domObject.appendChild(title);
        this.#domObject.appendChild(todosList);
    }

    clear()
    {
        this.#todoItems.forEach(todoItem => {
            if (todoItem.destroy) {
                todoItem.destroy();
            }
        });
        this.#todoItems = [];
        
        this.#domObject.innerHTML = '';
    }
}