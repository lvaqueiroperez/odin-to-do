const Project = class {

    #tasks = [];

    constructor(name, description) {

        this.name = name;
        this.description = description;
        this._id = crypto.randomUUID();

    }

    get id() {
        return this._id;
    }

    deleteTask(idToDelete) {
        this.#tasks.splice(this.#tasks.findIndex((task) => task.id === idToDelete), 1);
        console.log("Current project tasks: \n" + this.#tasks);
    }

    getTasks() {
        return this.#tasks;
    }

    addTask(newTask = "") {

        if (newTask) {

            newTask.setProjectId(this.id);
            this.#tasks.push(newTask);

        } else {
            const taskName = prompt("Please, enter the new task's name");
            const taskDescription = prompt("Please, enter the new task's description");
            const taskDueDate = prompt("Please, enter the new task's due date");
            const taskPriority = prompt("Does this new task have priority? yes/no") === "yes" ? true : false;

            const newTask = new Task(taskName, taskDescription, taskDueDate, taskPriority);
            newTask.setProjectId(this.id);

            this.#tasks.push(newTask);
        }

        console.log("NEW TASK ADDED TO THIS PROJECT");
        console.table(this.#tasks);

    }

}

const Task = class {

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

    toggleDone() {
        this.done = !this.done;
    }

}

export { Project, Task }; 