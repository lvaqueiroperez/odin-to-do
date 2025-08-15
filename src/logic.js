// TODO: Poner argumentos opcionales
// Crear global tasks y asociarlas a un proyecto ya existente, así como eliminarlas
// y cambiar su estado
// Acabar todas las funcionalidades de la homepage + proyecto global, luego pasar
// a las funcionalidades de los projectos y sus tasks


// Me mola mucho este estilo de programación modular, creo funcionalidades como módulos
// que luego serán fáciles de añadir junto al DOM!
const homePageModule = (function () {

    class Project {


        #tasks = [];

        constructor(name, description) {

            this.name = name;
            this.description = description;
            this.id = crypto.randomUUID();

        }

        getId() {
            return this.id;
        }

        deleteTask(idToDelete) {
            this.#tasks.splice(this.#tasks.findIndex((task) => task.id === idToDelete), 1);
            console.log("Current tasks: \n" + this.#tasks);
        }

        getTasks() {
            // console.log("PROJECT NAME: " + this.name);
            // console.table(this.#tasks);
            return this.#tasks;
        }

        addTask() {

            const taskName = prompt("Please, enter the new task's name");
            const taskDescription = prompt("Please, enter the new task's description");
            const taskDueDate = prompt("Please, enter the new task's due date");
            const taskPriority = prompt("Does this new task have priority? yes/no") === "yes" ? true : false;

            const newTask = new Task(taskName, taskDescription, taskDueDate, taskPriority);
            newTask.setProjectId(this.getId);

            this.#tasks.push(newTask);

            console.log("NEW TASK ADDED");
            console.table(this.#tasks);

        }

        pushTask(newTask) {
            newTask.setProjectId(this.getId());
            this.#tasks.push(newTask);
        }

    }

    class Task {

        #taskId = crypto.randomUUID();

        constructor(title, description, dueDate, priority, projectId = "global") {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.done = false;
            this.projectId = projectId;
        }


        getTaskId() {
            return this.#taskId;
        }

        getProjectId() {
            return this.projectId;
        }

        setProjectId(projectId) {
            this.projectId = projectId;
        }

    }

    let projectsArray = [new Project("project1", "sample project"), new Project("project2", "sample project 2"), new Project("project3", "sample project 3")];
    let globalTasksArray = [new Task("task1", "task test 1", "01/01/2026", false), new Task("task2", "task test 3", "01/01/2026", false), new Task("task3", "taks test 3", "01/01/2026", false)];

    console.log("**************WELCOME**************");

    console.table(projectsArray);

    // search bar
    const searchProject = () => {

        let projectName = prompt("Write the name of the project", "");

        let project = projectsArray.find((project) =>
            project.name.toLowerCase() === projectName.toLowerCase()
        );

        if (project) {
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
    const loadProject = () => {


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


    return { searchProject, createProject, loadProject, showGlobalProject, createGlobalTask };

})();




export { homePageModule };
