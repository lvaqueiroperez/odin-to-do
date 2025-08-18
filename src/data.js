import { Project, Task } from "./TaskProjectClasses";

let projectsArray = [new Project("project1", "sample project"), new Project("project2", "sample project 2"), new Project("project3", "sample project 3")];
let globalTasksArray = [new Task("task1", "task test 1", "01/01/2026", false), new Task("task2", "task test 3", "01/01/2026", false), new Task("task3", "taks test 3", "01/01/2026", false)];

export { projectsArray, globalTasksArray };