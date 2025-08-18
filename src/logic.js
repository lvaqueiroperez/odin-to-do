// Me mola mucho este estilo de programación modular, creo funcionalidades como módulos
// que luego serán fáciles de añadir junto al DOM!
import { Project, Task } from "./TaskProjectClasses";
import { projectsArray, globalTasksArray } from "./data";

const homePageModule = (function () {

    console.log("**************WELCOME**************");

    console.table(projectsArray);

    // search bar
    // add autocomplete with form logic
    // display error message when not found
    const searchProject = () => {

        let projectName = prompt("Write the name of the project", "");

        let project = projectsArray.find((project) =>
            project.name.toLowerCase() === projectName.toLowerCase()
        );

        if (project) {
            console.log("PROJECT FOUND, HERE ARE ITS TASKS:");
            console.table(project.getTasks());
        } else {
            alert("We couldn't find that project name, make sure you write its exact name.");
        }


    }

    // + button click
    const createProject = () => {

        const projectName = prompt("Please, enter the new project's name");
        const projectDescription = prompt("Please, enter the new project's description");

        projectsArray.push(new Project(projectName, projectDescription));

        console.log("NEW PROJECT ADDED");
        console.table(projectsArray);

    }

    // project click (id and event listeners will be used in the future)
    // show the project and its options (new menu like index.js)
    const loadProject = () => {

        const projectName = prompt("Please, enter the new project's name (en el futuro se clickará)");
        const projectFound = projectsArray.find((project) => { return project.name.toLowerCase() === projectName.toLowerCase() });

        if (projectFound) {

            console.log("PROJECT FOUND:");
            console.table(projectFound);

            const userInput = prompt("1: Add new task to project\n2: Toggle task done\n3: Edit project name\n4: Edit project description\n5: Delete Task\n6: Delete Project", "");

            switch (userInput) {
                case "1":

                    projectFound.addTask();
                    console.log("NEW TASK ADDED:");
                    console.table(projectFound);

                    break;

                case "2":

                    const taskTitle = prompt("Please, enter the task title", "");

                    const targetTask = projectFound.getTasks().find((task) => task.title === taskTitle);

                    if (targetTask) {

                        targetTask.toggleDone();
                        console.log("TASK TOGGLED: ");
                        console.table(targetTask);
                        console.log("PROJECT STATUS:");
                        console.log(projectFound);

                    } else {
                        alert("Sorry, we couldn't find that class.");
                    }

                    break;

                case "3":

                    // habrá que revisar en un futuro el límite de caracteres
                    const newName = prompt("Please, enter the new project's name", "");

                    projectFound.name = newName;

                    console.log("CHANGED PROJECT'S NAME");
                    console.table(projectFound);

                    break;

                case "4":

                    // habrá que revisar en un futuro el límite de caracteres
                    const newDesc = prompt("Please, enter the new project's description", "");

                    projectFound.description = newDesc;

                    console.log("CHANGED PROJECT'S DESCRIPTION");
                    console.table(projectFound);

                    break;



            }



        } else {
            alert("Sorry, we couln't find that project.");
        }


    }

    const showGlobalProject = () => {

        let allTasksArray = globalTasksArray;

        projectsArray.forEach((project) => {

            allTasksArray.push(...project.getTasks());

        });

        console.log("***GLOBAL PROJECT***");
        console.table(allTasksArray);

    }

    const createGlobalTask = () => {

        const taskName = prompt("Please, enter the new task's name");
        const taskDescription = prompt("Please, enter the new task's description");
        const taskDueDate = prompt("Please, enter the new task's due date");
        const taskPriority = prompt("Does this new task have priority? yes/no") === "yes" ? true : false;

        globalTasksArray.push(new Task(taskName, taskDescription, taskDueDate, taskPriority));

        console.log("NEW GLOBAL TASK ADDED");
        console.table(globalTasksArray);

    }

    const associateGlobalTaskWithProject = () => {

        console.log("Global Tasks without project:");
        console.table(globalTasksArray);
        console.log("Projects:");
        console.table(projectsArray);

        const taskTitle = prompt("Enter the title of the task you want to associate a project with");
        const projectName = prompt("Enter the name of the task's project");

        const targetProject = projectsArray.find((project) => project.name === projectName);

        const targetTask = globalTasksArray.find((task) => task.title === taskTitle);

        // crear una mejor comprobación y manejo de errores
        if ((targetProject) && (targetTask)) {

            console.log("TASK'S PROJECT ID: " + targetTask.getProjectId());

            targetProject.pushTask(targetTask);
            console.log(targetProject.getTasks());

            //Delete tasks from global tasks array
            globalTasksArray.splice(globalTasksArray.findIndex((task) => task.getTaskId() === targetTask.getTaskId()), 1);

            console.log("TASK ADDED TO PROJECT: " + projectName + "\nGLOBAL PROJECT STATUS:");
            console.table(showGlobalProject());



        } else {
            alert("Sorry, we couldn't find that project or task.");
        }

    }


    return { searchProject, createProject, loadProject, showGlobalProject, createGlobalTask, associateGlobalTaskWithProject };

})();




export { homePageModule };
