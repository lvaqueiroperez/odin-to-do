// CÓDIGO DE ITERACCIÓN CON EL USER Y CON EL DOM
// hacer la función de load event listeners cuando el dom esté cargado?
// TODO: Refactorizar variables creadas en bucles, no crear una variable en cada vuelta!!!
import { projectsArray, globalTasksArray } from "./data";
import { homePageModule } from "./logic";

const homePageDOM = (function () {

    const homepageProjectListContainer = document.querySelector(".homepageProjectListContainer");
    const homepageCreateProjectDialog = document.querySelector(".createProjectDialog");
    const loadedProjectDialog = document.querySelector(".loadedProjectDialog");

    const globalProjectContainer = document.querySelector(".globalProjectContainer");

    const loadHomepageProjectList = function () {

        removeElementChildren(homepageProjectListContainer);


        projectsArray.forEach((project) => {

            const projectButton = document.createElement("button");
            projectButton.textContent = project.name;
            projectButton.setAttribute("data-project-id", project.id);

            homepageProjectListContainer.appendChild(projectButton);

        });

        // create project button
        const createProjectButton = document.createElement("button");
        createProjectButton.textContent = " + ";
        createProjectButton.setAttribute("id", "createProjectButton");
        homepageProjectListContainer.appendChild(createProjectButton);

    }

    const loadProjectSearchDatalist = function () {

        const projectDatalist = document.querySelector("#projectList");

        removeElementChildren(projectDatalist);

        projectsArray.forEach((project) => {

            const option = document.createElement("option");
            option.textContent = project.name;

            projectDatalist.appendChild(option);

        });


    }

    const loadGlobalProject = function () {

        removeElementChildren(globalProjectContainer);

        homePageModule.getGlobalProjectTasks().forEach((task) => {

            const taskCard = document.createElement("div");
            taskCard.setAttribute("class", "taskCard");

            const taskTitle = document.createElement("p");
            taskTitle.textContent = task.title;

            // todo: descriptions must be short, put a maxlength
            const taskDesc = document.createElement("p");
            taskDesc.textContent = task.description;

            const taskDueDate = document.createElement("p");
            taskDueDate.textContent = task.dueDate;

            const taskDone = document.createElement("p");
            taskDone.textContent = task.done === true ? "Done." : "Not Done.";

            const taskProject = document.createElement("p");

            const taskProjectName = task.getProjectId() === "global" ? "global" : homePageModule.getProjectNameById(task.getProjectId);

            taskProject.textContent = "Project: " + taskProjectName;

            taskCard.append(taskTitle, taskDesc, taskDueDate, taskDone, taskProject);

            globalProjectContainer.appendChild(taskCard);

        });

    }


    const loadHomepageEventListeners = function () {

        const searchButton = document.querySelector(".searchProject>button");
        const globalProjectButtonContainer = document.querySelector(".globalProjectButtonContainer");

        searchButton.addEventListener("click", (e) => {

            const projectName = document.querySelector("input[type='search']").value;

            const foundProjects = homePageModule.searchProjects(projectName);

            if (foundProjects.length > 0) {

                loadProjectSearchResults(foundProjects);

            } else {
                // todo: mensaje "no se ha encontrado ningún proyecto con ese nombre"
                alert("We couldn't find any project with that name.");
                loadHomepageProjectList();
            }

        });

        homepageProjectListContainer.addEventListener("click", (e) => {


            // aunque los 2 sean botones, primero leerá este if
            if (e.target.id === "createProjectButton") {

                homepageCreateProjectDialog.showModal();

                // load project
            } else if (e.target.tagName === "BUTTON") {

                const projectToLoad = homePageModule.getProjectById(e.target.dataset.projectId);
                console.log(projectToLoad);

                const projectName = document.createElement("h2");
                projectName.textContent = projectToLoad.name;

                const projectDescription = document.createElement("p");
                projectDescription.textContent = projectToLoad.description;

                const tasksContainer = document.createElement("div");
                projectToLoad.getTasks().forEach((task) => {

                    console.log(task);

                    const singleTaskContainer = document.createElement("div");
                    singleTaskContainer.setAttribute("class", "taskCard");

                    const taskCheckbox = document.createElement("input");
                    taskCheckbox.setAttribute("type", "checkbox");
                    taskCheckbox.setAttribute("id", task.taskId);

                    const taskTitle = document.createElement("p");
                    taskTitle.textContent = task.title;
                    taskTitle.setAttribute("class", "taskTitle");

                    const taskDueDate = document.createElement("p");
                    taskDueDate.textContent = task.dueDate;
                    taskDueDate.setAttribute("class", "taskDueDate");

                    singleTaskContainer.append(taskCheckbox, taskTitle, taskDueDate);

                    tasksContainer.appendChild(singleTaskContainer);

                });

                loadedProjectDialog.append(projectName, projectDescription, tasksContainer);

                loadedProjectDialog.showModal();

            }


        });

        // crearlo solo cuando se clicke en createProject?
        homepageCreateProjectDialog.addEventListener("click", (e) => {

            switch (e.target.id) {

                case "exitCreateProjectButton":

                    homepageCreateProjectDialog.close();

                    break;

                case "createProjectSubmitButton":

                    const projectName = homepageCreateProjectDialog.querySelector("#projectName").value;
                    const projectDescription = homepageCreateProjectDialog.querySelector("#projectDescription").value;

                    homePageModule.createProject(projectName, projectDescription);
                    // soft reset de la page, cargar todo de nuevo, como recargar la página... (puede que recargar la página sea útil en el futuro cuando tenga la DB)
                    // FUNCIÓN TEMPORAL DE RELOAD:
                    loadHomepageProjectList();
                    loadProjectSearchDatalist();
                    loadGlobalProject();
                    homepageCreateProjectDialog.close();
            }

        });

    }

    function loadProjectSearchResults(foundProjects) {

        removeElementChildren(homepageProjectListContainer);

        foundProjects.forEach((project) => {

            const projectButton = document.createElement("button");
            projectButton.textContent = project.name;
            projectButton.setAttribute("data-projectId", project.id);

            homepageProjectListContainer.appendChild(projectButton);

            addEraseSearchResultsButton(homepageProjectListContainer);

        });

    }

    function addEraseSearchResultsButton(element) {

        const eraseResultsButton = document.createElement("button");
        eraseResultsButton.textContent = "erase results";

        element.appendChild(eraseResultsButton);

        // event listener is deleted after use or when its element is removed
        eraseResultsButton.addEventListener("click", (e) => {

            loadHomepageProjectList();

        }, { once: true });
    }

    return { loadHomepageProjectList, loadProjectSearchDatalist, loadHomepageEventListeners, loadGlobalProject };

})();

function removeElementChildren(element) {

    Array.from(element.children).forEach(child => child.remove());

}

export { homePageDOM };