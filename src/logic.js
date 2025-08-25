// LÓGICA DE LA APLICACIÓN
import { Project, Task } from "./TaskProjectClasses";
import { projectsArray, globalTasksArray } from "./data";

const homepageLogic = (function () {

    const searchProjects = (projectName) => {

        // filter retorna en un array todos los resultados que cumplan con la condición
        // devuelve array vacío si no encuentra nada
        return projectsArray.filter((project) =>
            project.name.toLowerCase() === projectName.toLowerCase()
        );

    }

    const createProject = (projectName, projectDescription) => {
        projectsArray.push(new Project(projectName, projectDescription));
    }

    const getProjectById = (projectId) => {

        const projectFound = projectsArray.find((project) => { return project.id === projectId });

        if (projectFound) {

            return projectFound;

            // código donde se pondrá un event listener que ejecutará todas las opciones de este switch tras mostrar el projecto
            const userInput = prompt("1: Add new task to project\n2: Toggle task done\n3: Edit project name\n4: Edit project description\n5: Delete Task\n6: Delete Project\n7: Edit Project Task", "");

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

                case "5":

                    console.table(projectFound.getTasks());
                    // se seleccionará gráficamente
                    const deletedTaskTitle = prompt("Please, select the task you want to delete from this project: ", "");

                    const deleteTaskIndex = projectFound.getTasks().findIndex(task => task.title === deletedTaskTitle);

                    if (deleteTaskIndex || deleteTaskIndex === 0) {
                        projectFound.getTasks().splice(deleteTaskIndex, 1);
                        console.log("TASK REMOVED FROM PROJECT:");
                        console.table(projectFound);
                        console.table(projectFound.getTasks());


                    } else {
                        alert("Sorry, we couldn't find that task in this project.");
                    }

                    break;

                case "6":

                    if (window.confirm("Are you sure you want to delete this project?")) {

                        projectsArray.splice(projectsArray.findIndex(project => projectFound.id === project.id), 1);
                        break;

                    } else {
                        break;
                    }

                case "7":

                    const projectTaskTitle = prompt("Please, enter the title of the project's task you want to edit:");

                    const foundTask = projectFound.getTasks().find(task => task.title.toLowerCase() === projectTaskTitle.toLowerCase());

                    if (foundTask) {

                        // que aparezca un formulario con los campos a editar, un botón de cancelar y otro de save
                        // campos ya rellenados con la información existente
                        console.log("TASK TO EDIT:");
                        console.table(foundTask);
                        foundTask.title = prompt("Enter the task's title:", "");
                        foundTask.description = prompt("Enter the task's description:", "");
                        foundTask.dueDate = prompt("Enter the task's due date:", "");
                        foundTask.priority = prompt("Is this a priority? (yes/no):", "") === "yes" ? true : false;

                        console.log("TASK EDITED:");
                        console.table(foundTask);

                    } else {
                        alert("We couldn't find that task's name, sorry.");
                    }

                    break;



            }



        } else {
            alert("Sorry, we couln't find that project.");
        }


    }

    const addTaskToProject = (project, taskTitle, taskDescription, taskDueDate, taskPriority) => {

        const newTask = new Task(taskTitle, taskDescription, taskDueDate, taskPriority);

        project.addTask(newTask);

    }

    const getGlobalProjectTasks = () => {

        let allTasksArray = [];

        allTasksArray.push(...globalTasksArray);

        projectsArray.forEach((project) => {

            allTasksArray.push(...project.getTasks());

        });

        return allTasksArray;

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

            targetProject.addTask(targetTask);
            console.log(targetProject.getTasks());

            //Delete tasks from global tasks array
            globalTasksArray.splice(globalTasksArray.findIndex((task) => task.taskId === targetTask.taskId), 1);

            console.log("TASK ADDED TO PROJECT: " + projectName + "\nGLOBAL PROJECT STATUS:");
            console.table(getGlobalProjectTasks());



        } else {
            alert("Sorry, we couldn't find that project or task.");
        }

    }

    // de momento solo permitir borrar las tasks globales, las de proyectos habrá que acceder a proyectos para borrarlas
    // pendiente de usar siempre id para encontrar cosas que queramos editar o borrar, ya que puede haber titles o nombres iguales
    const deleteGlobalTask = () => {

        const taskTitle = prompt("Please, enter the title of the task you want to delete:");

        const foundTask = globalTasksArray.find(task => task.title === taskTitle);

        if (foundTask.getProjectId === "global") {

            globalTasksArray.splice(globalTasksArray.findIndex(task => task.id === foundTask.id), 1);
            console.log("TASK DELETED FROM GLOBAL PROJECT");
            console.table(globalTasksArray);

        } else {
            alert("This task is currently associated to a project, if you want to delete it, do it inside that project.");
        }

        console.log("NEW GLOBAL TASK ADDED");
        console.table(globalTasksArray);

    }

    const editGlobalTask = () => {

        const taskTitle = prompt("Please, enter the title of the task you want to edit:");

        const foundTask = globalTasksArray.find(task => task.title.toLowerCase() === taskTitle.toLowerCase());

        if (foundTask.getProjectId() === "global") {

            // que aparezca un formulario con los campos a editar, un botón de cancelar y otro de save
            // campos ya rellenados con la información existente
            console.log("TASK TO EDIT:");
            console.table(foundTask);
            foundTask.title = prompt("Enter the task's title:", "");
            foundTask.description = prompt("Enter the task's description:", "");
            foundTask.dueDate = prompt("Enter the task's due date:", "");
            foundTask.priority = prompt("Is this a priority? (yes/no):", "") === "yes" ? true : false;

            console.log("TASK EDITED:");
            console.table(foundTask);

        } else {
            alert("This task is currently associated to a project, if you want to edit it, do it inside that project.");
        }

    }


    return { searchProjects, createProject, getProjectById, addTaskToProject, getGlobalProjectTasks, createGlobalTask, associateGlobalTaskWithProject, deleteGlobalTask, editGlobalTask };

})();




export { homepageLogic };
