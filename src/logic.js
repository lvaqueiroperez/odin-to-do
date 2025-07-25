// TODO: Poner argumentos opcionales
const homePageModule = (function () {

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
            console.log("PROJECT NAME: " + this.name);
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

    let projectsArray = [new Project("project1", "sample project")];

    console.log("**************WELCOME**************");

    console.table(projectsArray);

    const searchProject = (string) => {
        return projectsArray.find((project) =>
            project.name.toLowerCase() === string.toLowerCase()
        );
    }

    return { searchProject };

})();




export { homePageModule };
