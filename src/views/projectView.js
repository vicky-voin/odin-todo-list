import "./projectView.css"
import { ToDoButton } from "../components/projectView/todoItem";
import EventEmitter from "events";
import { ViewComponent } from "../components/common/viewComponent";
import { AddItemButton } from "../components/common/addItemButton";
import { ToDo } from "../todo";

export class ProjectView extends ViewComponent
{
    #todoItems = [];

    constructor(project, document)
    {
        super();

        const root = document.createElement('div');
        root.className = 'project-view';
        
        this.__domObject = root;
        
        this.__eventEmitter = new EventEmitter();

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
            let todoItem = this.#getToDoButton(todo, document);
            this.#todoItems.push(todoItem);
            todosList.appendChild(todoItem.domObject);
        });

        const addTodoButton = new AddItemButton(document);
        addTodoButton.domObject.classList.add('project-add-button');
        addTodoButton.eventEmitter.on('submit', (value) => 
        {
            const newToDo = new ToDo(value);
            project.addToDo(newToDo);

            let todoItem = this.#getToDoButton(newToDo, document);
            this.#todoItems.push(todoItem);
            todosList.appendChild(todoItem.domObject);

            this.__eventEmitter.emit('todoSelected', newToDo);
        });

        this.__domObject.appendChild(title);
        this.__domObject.appendChild(todosList);
        this.__domObject.appendChild(addTodoButton.domObject);
    }

    clear()
    {
        this.#todoItems.forEach(todoItem => {
            if (todoItem.destroy) {
                todoItem.destroy();
            }
        });
        this.#todoItems = [];
        
        this.__domObject.innerHTML = '';
    }

    #getToDoButton(todo, document)
    {
        let todoItem = new ToDoButton(todo, false, document);
        todoItem.eventEmitter.on('selected', () =>
        {
            this.__eventEmitter.emit('todoSelected', todo);
        });
        todoItem.eventEmitter.on('checked', (isChecked) =>
        {
            todo.isComplete = isChecked;
        });
        todo.eventEmitter.on("isComplete", (newValue) => {todoItem.setChecked(newValue)});
        todo.eventEmitter.on("title", (newValue) => {todoItem.setText(newValue)});
        
        todoItem.setChecked(todo.isComplete);

        return todoItem;
    }
}