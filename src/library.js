export class Library
{
    #projects = [];

    constructor(defaultProject)
    {
        this.addProject(defaultProject);
    }

    addProject(project)
    {
        this.#projects.push(project);
    }

    deleteProject(index)
    {
        this.#projects.splice(index, 1);
    }

    moveToDoFromTo(todo, toProjectIndex)
    {
        let fromProject = this.#projects[this.#projects.findIndex(project => project.id === todo.projectId)];

        let todoIndex = fromProject.getToDos().indexOf(todo);
        fromProject.getToDos().splice(todoIndex,1);

        this.#projects[toProjectIndex].addToDo(todo);
    }

    getProjects()
    {
        return this.#projects;
    }
}