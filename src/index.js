import {ToDo, Priority} from "./todo"
import {Project} from "./project"

const testToDo = new ToDo("Test Name");
testToDo.description = "Test Description";
testToDo.dueDate = new Date();
testToDo.priority = Priority.HIGH;
let step1 = testToDo.addStep("Step one of the test task");
let step2 = testToDo.addStep("Step two of the test task");
testToDo.setIsComplete(false);
step1.setIsComplete(true);

console.log(testToDo);

const myProject = new Project("My Project");
myProject.addToDo(testToDo);
myProject.addToDo(testToDo);
console.log(myProject);
myProject.deleteToDo(0);
console.log(myProject.getToDos());
