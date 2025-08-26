import {ToDo, Priority, createDefaultTasks} from "./todo"
import {Project, createDefaultProject} from "./project"
import {Library} from "./library"
import "./main.css"
import {SidebarView} from "./views/sidebarView"
import { ProjectView } from "./views/projectView"
import { TodoView } from "./views/todoView"

const defaultProject = createDefaultProject();
createDefaultTasks().forEach(todo => {
    defaultProject.addToDo(todo);
});

const myLibrary = new Library(defaultProject);
console.log(myLibrary);

const testToDo = new ToDo("Test Name");
testToDo.description = "Test Description";
testToDo.dueDate = new Date();
testToDo.priority = Priority.HIGH;
let step1 = testToDo.addStep("Step one of the test task");
let step2 = testToDo.addStep("Step two of the test task");
testToDo.isComplete = false;
step1.isComplete = true;

console.log(testToDo);

const myProject = new Project("My Project", myLibrary);
myProject.addToDo(testToDo);
myProject.addToDo(testToDo);
console.log(myProject);
myProject.deleteToDo(0);
console.log(myProject.getToDos());

myLibrary.moveToDoFromTo(defaultProject.getToDos()[0], 1);
console.log(myLibrary);

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
const projectView = new ProjectView(defaultProject, document);
projectView.eventEmitter.on('todoSelected', (todo) => 
{
    todoViewRoot.hidden = false;
    todoView.show(todo);
});
projectViewRoot.appendChild(projectView.domObject);

const todoViewRoot = document.querySelector(".todo-view-container");
const todoView = new TodoView(testToDo, document);
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