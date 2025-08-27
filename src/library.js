import { Serializable } from "./serializable";
import { Project } from "./project";

export class Library extends Serializable
{
    #projects = [];
    #storageKey;

    constructor(storageKey, defaultProject)
    {
        super();
        
        this.#storageKey = storageKey;
        
        const loadedData = this.load(storageKey, defaultProject ? [defaultProject] : []);
        
        this.#projects = loadedData.map(projectData => Project.fromJSON(projectData));

        console.log(this.#projects);
    }

    saveToStorage()
    {
        this.save(this.#storageKey, this.#projects.map(project => project.toJSON()));
    }

    addProject(project)
    {
        this.#projects.push(project);
        this.saveToStorage();
    }

    deleteProject(index)
    {
        this.#projects.splice(index, 1);
        this.saveToStorage();
    }

    moveToDoFromTo(todo, toProjectIndex)
    {
        let fromProject = this.#projects[this.#projects.findIndex(project => project.id === todo.projectId)];

        let todoIndex = fromProject.getToDos().indexOf(todo);
        fromProject.getToDos().splice(todoIndex,1);

        this.#projects[toProjectIndex].addToDo(todo);
            
        this.saveToStorage();
    }

    getProjects()
    {
        return this.#projects;
    }

    getProjectWithId(id)
    {
        return this.#projects.find((project) => project.id == id);
    }
}