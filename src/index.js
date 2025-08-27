import {createDefaultTasks} from "./todo"
import {Project, createDefaultProject} from "./project"
import {Library} from "./library"
import "./index.css"
import "./common.css"
import {SidebarView} from "./views/sidebarView"
import { ProjectView } from "./views/projectView"
import { TodoView } from "./views/todoView"

const defaultProject = createDefaultProject();
createDefaultTasks().forEach(todo => {
    defaultProject.addToDo(todo);
});

const libraryStorageKey = "__ToDoApp__library"; 
const myLibrary = new Library(libraryStorageKey, defaultProject);

window.addEventListener('beforeunload', () => 
{
    myLibrary.saveToStorage();
});

const sidebarRoot = document.querySelector(".sidebar-view-container");
const sidebarView = new SidebarView(myLibrary, document);
sidebarView.eventEmitter.on('projectSelected', (project) => 
{
    projectView.show(project, document);
});
sidebarView.eventEmitter.on('addNewProject', (projectTitle) => 
{
    const newProject = new Project(projectTitle, myLibrary);
    sidebarView.refreshProjectList(document, myLibrary);
});
sidebarRoot.appendChild(sidebarView.domObject);

const projectViewRoot = document.querySelector(".project-view-container");
const projectView = new ProjectView(myLibrary.getProjects()[0], document);
projectView.eventEmitter.on('todoSelected', (todo) => 
{
    todoViewRoot.hidden = false;
    todoView.show(todo);
});
projectViewRoot.appendChild(projectView.domObject);

const todoViewRoot = document.querySelector(".todo-view-container");
const todoView = new TodoView(document);
todoView.eventEmitter.on('deleteTodo', (todo) => 
{
    let project = myLibrary.getProjectWithId(todo.projectId);
    project.deleteToDoWithId(todo.id);
    todoView.clear();
    todoViewRoot.hidden = true;
    projectView.show(project, document);
});
todoViewRoot.hidden = true;
todoViewRoot.appendChild(todoView.domObject);