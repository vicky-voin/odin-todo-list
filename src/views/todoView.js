import "./todoView.css"
import {ToDoButton} from "../components/projectView/todoItem"
import { DropdownTag } from "../components/common/dropdownTag";
import { Priority } from "../todo";
import EventEmitter from "events";
import autosize from "autosize";
import { ViewComponent } from "../components/common/viewComponent";
import { DynamicTextArea } from "../components/common/dynamicTextArea";
import { AddItemButton } from "../components/common/addItemButton";

export class TodoView extends ViewComponent
{
    #steps = [];
    #currentTodo;

    constructor(todo, document)
    {
        super();

        const root = document.createElement('div');
        root.className = 'todo-view';
        
        this.__domObject = root;
        this.__eventEmitter = new EventEmitter();

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
        completedCheckbox.checked = todo.isComplete;
        completedCheckbox.addEventListener("click", () => 
        {
            this.#currentTodo.isComplete = completedCheckbox.checked;
        })

        const title = new DynamicTextArea(document);
        title.domObject.classList.add("todo-title");
        title.domObject.textContent = todo.title;
        title.domObject.addEventListener("change", () => {
            this.updateTodoProperty("title", title.domObject.value);
        });

        const priority = new DropdownTag([Priority.HIGH, Priority.MEDIUM, Priority.LOW], document, todo.priority);
        priority.domObject.classList.add("todo-priority");

        priority.eventEmitter.on('valueChanged', (newValue) => 
        {
            this.updateTodoProperty('priority', newValue);
        });

        header.appendChild(completedCheckbox);
        header.appendChild(title.domObject);
        header.appendChild(priority.domObject);

        const descriptionTitle = document.createElement('div');
        descriptionTitle.className = "todo-section-title";
        descriptionTitle.textContent = "NOTES";

        const description = new DynamicTextArea(document);
        description.domObject.classList.add("todo-description");
        if(todo.description)
            description.domObject.textContent = todo.description;
        description.domObject.placeholder = "Insert your notes here...";
        description.domObject.addEventListener("change", () => {
            this.updateTodoProperty("description", description.domObject.value);
        });

        const stepsTitle = document.createElement('div');
        stepsTitle.className = "todo-section-title";
        stepsTitle.textContent = "STEPS";

        const stepsList = document.createElement('div');
        stepsList.className = 'steps-list';

        todo.steps.forEach(step => {
            let stepItem = new ToDoButton(step, true, document);
            stepItem.setChecked(step.isComplete);
            stepItem.eventEmitter.on('checked', (isChecked) => {
                step.isComplete = isChecked;
            });
            this.#steps.push(stepItem);
            stepsList.appendChild(stepItem.domObject);
        });

        const addStepButton = new AddItemButton(document);
        stepsList.appendChild(addStepButton.domObject);

        this.__domObject.appendChild(header);
        this.__domObject.appendChild(descriptionTitle);
        this.__domObject.appendChild(description.domObject);
        this.__domObject.appendChild(stepsTitle);
        this.__domObject.appendChild(stepsList);
    }

    clear()
    {
        this.#steps.forEach(stepItem => {
            if (stepItem.destroy) {
                stepItem.destroy();
            }
        });
        this.#steps = [];
        
        this.__domObject.innerHTML = '';
    }

    updateTodoProperty(property, value) {
        if (this.#currentTodo) {
            this.#currentTodo[property] = value;
            this.__eventEmitter.emit('todoChanged', {
                id: this.#currentTodo.id,
                [property]: value
            });
        }
    }
}