import "./todoView.css"
import {ToDoButton} from "../components/projectView/todoItem"
import { DropdownTag } from "../components/common/dropdownTag";
import { Priority } from "../todo";
import EventEmitter from "events";
import autosize from "autosize";

export class TodoView
{
    #domObject;
    #eventEmitter;
    #steps = [];
    #currentTodo;
    
    get domObject() {return this.#domObject};

    constructor(todo, document)
    {
        const root = document.createElement('div');
        root.className = 'todo-view';
        
        this.#domObject = root;
        this.#eventEmitter = new EventEmitter();

        this.show(todo);
    }

    show(todo)
    {
        this.clear();
        this.#currentTodo = todo;
        
        const header = document.createElement('div');
        header.className = "todo-header";

        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.className = "todo-completed-checkbox";

        const title = document.createElement('textarea');
        title.className = "todo-title";
        title.textContent = todo.title;
        autosize(title);
        title.addEventListener('focus', () => {
            autosize.update(title);
        });

        const priority = new DropdownTag([Priority.HIGH, Priority.MEDIUM, Priority.LOW], document, todo.priority);
        priority.domObject.classList.add("todo-priority");

        priority.eventEmitter.on('valueChanged', (newValue) => 
        {
            this.updateTodoProperty('priority', newValue);
        });

        header.appendChild(completedCheckbox);
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

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node === this.#domObject || node.contains?.(this.#domObject)) {
                            autosize.update(title);
                            observer.disconnect(); // Stop observing once triggered
                        }
                    });
                }
            });
        });

        if (!document.contains(this.#domObject)) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            autosize.update(title);
        }
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

    updateTodoProperty(property, value) {
        if (this.#currentTodo) {
            this.#currentTodo[property] = value;
            this.#eventEmitter.emit('todoChanged', {
                id: this.#currentTodo.id,
                [property]: value
            });
        }
    }

    get eventEmitter() {
        return this.#eventEmitter;
    }

    // Call this method after attaching TodoView to the DOM
    onAttachedToDOM() {
        const title = this.#domObject.querySelector('.todo-title');
        if (title) {
            autosize.update(title);
        }
    }
}