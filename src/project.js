export class Project
{
    #title = '';
    #toDos = [];

    constructor(title)
    {
        this.#title = title;
    }

    addToDo(todo)
    {
        this.#toDos.push(todo);
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