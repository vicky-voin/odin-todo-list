var EventEmitter = require("events");
import { ToDo } from "./todo";

export class Project
{
    #id = crypto.randomUUID();
    #title = '';
    #toDos = [];

    constructor(title, library)
    {
        this.#title = title;

        this.eventEmitter = new EventEmitter();

        if(library)
            library.addProject(this);
    }

    get id () {
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    addToDo(todo)
    {
        this.#toDos.push(todo);
        todo.projectId = this.#id;

        this.eventEmitter.emit('sizeChanged', this.#toDos.length);
    }

    deleteToDo(index)
    {
        this.#toDos.splice(index,1);

        this.eventEmitter.emit('sizeChanged', this.#toDos.length);
    }

    deleteToDoWithId(id)
    {
        let index = this.#toDos.findIndex((todo) => todo.id == id);
        this.deleteToDo(index);
    }

    getToDos()
    {
        return this.#toDos;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            todos: this.#toDos.map(todo => todo.toJSON())
        };
    }

    static fromJSON(data) {
        const project = new Project(data.title);
        
        project.#id = data.id;
        
        if (data.todos && Array.isArray(data.todos)) {
            project.#toDos = data.todos.map(todoData => {
                const todo = ToDo.fromJSON(todoData);
                todo.projectId = project.#id;
                return todo;
            });
        }
        
        return project;
    }
}

function createDefaultProject(defaultTasks)
{
    const newProject = new Project("Personal");
    for(let task in defaultTasks)
    {
        newProject.addToDo(task);
    }

    return newProject;
}

export {createDefaultProject}