import "./projectView.css"
import { ToDoButton } from "../components/projectView/todoItem";
import EventEmitter from "events";

export class ProjectView
{
    #domObject;
    #eventEmitter;
    #todoItems = [];
    
    get domObject() {return this.#domObject};
    get eventEmitter() {return this.#eventEmitter};

    constructor(project, document)
    {
        const root = document.createElement('div');
        root.className = 'project-view';
        
        this.#domObject = root;
        
        this.#eventEmitter = new EventEmitter();

        this.show(project);
    }

    show(project)
    {
        this.clear();
        
        const title = document.createElement('h2');
        title.className = "project-title";
        title.textContent = project.title;

        const todosList = document.createElement('div');
        todosList.className = 'todos-list';

        project.getToDos().forEach(todo => {
            let todoItem = new ToDoButton(todo, document);
            todoItem.eventEmitter.on('selected', () =>
            {
                this.#eventEmitter.emit('todoSelected', todo);
            });
            this.#todoItems.push(todoItem);
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