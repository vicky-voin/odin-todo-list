import {ToDo, Priority} from "./todo"

const testToDo = new ToDo("Test Name");
testToDo.description = "Test Description";
testToDo.dueDate = new Date();
testToDo.priority = Priority.HIGH;
let step1 = testToDo.addStep("Step one of the test task");
let step2 = testToDo.addStep("Step two of the test task");
testToDo.setIsComplete(false);

console.log(testToDo);

step1.setIsComplete(true);

console.log(testToDo);