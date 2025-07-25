// TODO: Poner argumentos opcionales
// Identificar de qué proyecto proviene cada task!
const homePageModule = (function () {

    class Project {

        #id = crypto.randomUUID();

        #tasks = [new Task("task1", "sample task", "01/01/2026", true)];

        constructor(name, description) {

            this.name = name;
            this.description = description;

        }

        deleteTask(idToDelete) {
            this.tasks.splice(this.tasks.findIndex((task) => task.id === idToDelete), 1);
            console.log("Current tasks: \n" + this.tasks);
        }

        getTasks() {
            console.log("PROJECT NAME: " + this.name);
            console.table(this.tasks);
            return this.tasks;
        }

        addTask(newTask) {
            this.tasks.push(newTask);
        }

    }

    class Task {

        #taskId = crypto.randomUUID();
        #projectId = "global";

        constructor(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.done = false;
        }


        getTaskId() {
            return this.taskId;
        }

        getProjectId() {
            return this.getProjectId;
        }

        setProjectId(projectId) {
            this.projectId = projectId;
        }

    }

    let projectsArray = [new Project("project1", "sample project"), new Project("project2", "sample project 2"), new Project("project3", "sample project 3")];
    let globalTasksArray = [new Task("task1", "task test 1", "01/01/2026", false), new Task("task3", "task test 3", "01/01/2026", false), new Task("task3", "taks test 3", "01/01/2026", false)];

    console.log("**************WELCOME**************");

    console.table(projectsArray);

    // search bar
    const searchProject = () => {

        let projectName = prompt("Write the name of the project", "");

        let project = projectsArray.find((project) =>
            project.name.toLowerCase() === projectName.toLowerCase()
        );

        if (project) {
            return project.showTasks();
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
    const loadProject = () => {


    }


    return { searchProject, createProject, loadProject };

})();




export { homePageModule };
