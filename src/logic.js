// TODO: Poner argumentos opcionales

class Project {

    tasks = [new Task("task1", "sample task", "01/01/2026", true)];

    constructor(name, description) {

        this.name = name;
        this.description = description;

    }

    deleteTask(idToDelete) {
        this.tasks.splice(this.tasks.findIndex((task) => task.id === idToDelete), 1);
        console.log("Current tasks: \n" + this.tasks);
    }

    showTasks() {
        console.table(this.tasks);
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

}

class Task {

    #id = crypto.randomUUID();

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;

    }


    getId() {
        return this.id;
    }

}






export default function greet1() {
    console.log("this is logic, roger!");
}