export class Project
{
    #id = crypto.randomUUID();
    #title = '';
    #toDos = [];

    constructor(title, library)
    {
        this.#title = title;

        if(library)
            library.addProject(this);
    }

    get id () {
        return this.#id;
    }

    addToDo(todo)
    {
        this.#toDos.push(todo);
        todo.projectId = this.#id;
    }

    deleteToDo(index)
    {
        this.#toDos.splice(index,1);
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