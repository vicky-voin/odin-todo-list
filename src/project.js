var EventEmitter = require("events");

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