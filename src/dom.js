// CÓDIGO DE ITERACCIÓN CON EL USER Y CON EL DOM
// TODO: Refactorizar variables creadas en bucles, no crear una variable en cada vuelta!!!
// organizar y refactorizar, pensar qué es lo que merece estar dentro de una variable y qué no
// al final revisar event listeners, a ver cual necesita el "once" u otro arreglo para optimizarlo
// crear un event listener cada vez que se clicka algo y no cerrarlo después crea muchos problemas!
// cuando acabe, pedir que revisen el codigo para recomendarme cosas?
// pendiente de refactorizar más y crear más módulos, mucho código en un solo fichero es MALO
// hacer la priority de tasks basado en la due date, borrar el campo de priority
// intentar que no haya muchas variables globales
import { projectsArray, globalTasksArray } from "./data";
import { homepageLogic } from "./logic";
import { domUtil } from "./domUtil";

const homePageDOM = (function () {

    const homepageProjectListContainer = document.querySelector(".homepageProjectListContainer");
    const homepageCreateProjectDialog = document.querySelector(".createProjectDialog");
    const loadedProjectDialog = document.querySelector(".loadedProjectDialog");
    const loadedProjectData = document.querySelector(".loadedProjectData");
    const globalProjectContainer = document.querySelector(".globalProjectContainer");
    const projectDatalist = document.querySelector("#projectList");
    const searchButton = document.querySelector(".searchProject>button");
    const createProjectButton = document.querySelector("#createProjectButton");
    const closeProjectButton = document.querySelector("#closeProjectButton");
    const addProjectTaskButton = document.querySelector("#addProjectTaskButton");
    const addProjectTaskDialog = document.querySelector(".addProjectTaskDialog");


    const loadHomepageProjectList = function () {

        domUtil.removeElementChildren(homepageProjectListContainer);


        projectsArray.forEach((project) => {

            const projectButton = document.createElement("button");
            projectButton.textContent = project.name;
            projectButton.setAttribute("data-project-id", project.id);
            projectButton.setAttribute("class", "projectButton");

            homepageProjectListContainer.appendChild(projectButton);

        });


    }

    const loadProjectSearchDatalist = function () {

        domUtil.removeElementChildren(projectDatalist);

        projectsArray.forEach((project) => {

            const option = document.createElement("option");
            option.textContent = project.name;

            projectDatalist.appendChild(option);

        });

    }

    const loadGlobalProject = function () {

        domUtil.removeElementChildren(globalProjectContainer);

        homepageLogic.getGlobalProjectTasks().forEach((task) => {

            const taskCard = document.createElement("div");
            taskCard.setAttribute("class", "taskCard");

            const taskTitle = document.createElement("p");
            taskTitle.textContent = task.title;

            const taskDesc = document.createElement("p");
            taskDesc.textContent = task.description;

            const taskDueDate = document.createElement("p");
            taskDueDate.textContent = task.dueDate;

            const taskDone = document.createElement("p");
            taskDone.textContent = task.done === true ? "Done." : "Not Done.";

            const taskProject = document.createElement("p");

            const taskProjectName = task.getProjectId() === "global" ? "global" : homepageLogic.getProjectById(task.getProjectId()).name;

            taskProject.textContent = "Project: " + taskProjectName;

            taskCard.append(taskTitle, taskDesc, taskDueDate, taskDone, taskProject);

            globalProjectContainer.appendChild(taskCard);

        });

    }


    const loadHomepageEventListeners = function () {


        searchButton.addEventListener("click", function search(e) {

            const projectName = document.querySelector("input[type='search']").value;

            const foundProjects = homepageLogic.searchProjects(projectName);

            if (foundProjects.length > 0) {

                loadProjectSearchResults(foundProjects);


            } else {
                // todo: mensaje "no se ha encontrado ningún proyecto con ese nombre"
                alert("We couldn't find any project with that name.");
                loadHomepageProjectList();
            }

        });

        homepageProjectListContainer.addEventListener("click", function loadProject(e) {

            if (e.target.className === "projectButton") {

                const project = homepageLogic.getProjectById(e.target.dataset.projectId);

                loadProjectData(project.id);

                loadedProjectDialog.showModal();

                closeProjectButton.addEventListener("click", (e) => {
                    loadedProjectDialog.close();
                }, { once: true });


                addProjectTaskButton.addEventListener("click", function addTask(e) {

                    addProjectTaskDialog.showModal();

                    addProjectTaskDialog.addEventListener("click", function exitOrCreate(e) {
                        switch (e.target.id) {

                            case "exitCreateProjectTaskButton":

                                addProjectTaskDialog.removeEventListener("click", exitOrCreate);

                                addProjectTaskDialog.close();

                                break;

                            case "createTaskSubmitButton":

                                const taskTitle = addProjectTaskDialog.querySelector("#taskTitle").value;
                                const taskDescription = addProjectTaskDialog.querySelector("#taskDescription").value;
                                const taskDueDate = addProjectTaskDialog.querySelector("#taskDueDate").value;
                                const taskPriority = addProjectTaskDialog.querySelector("#taskPriority").value;

                                homepageLogic.addTaskToProject(project, taskTitle, taskDescription, taskDueDate, taskPriority);

                                loadProjectData(project.id);

                                homepageReload();

                                addProjectTaskDialog.close();

                                addProjectTaskDialog.removeEventListener("click", exitOrCreate);

                                break;
                        }
                    });

                });

            }

        });


        createProjectButton.addEventListener("click", (e) => {

            homepageCreateProjectDialog.show();

            homepageCreateProjectDialog.addEventListener("click", function exitOrCreate(e) {

                switch (e.target.id) {

                    case "exitCreateProjectButton":

                        homepageCreateProjectDialog.removeEventListener("click", exitOrCreate);

                        homepageCreateProjectDialog.close();

                        break;

                    case "createProjectSubmitButton":

                        const projectName = homepageCreateProjectDialog.querySelector("#projectName").value;
                        const projectDescription = homepageCreateProjectDialog.querySelector("#projectDescription").value;

                        homepageCreateProjectDialog.removeEventListener("click", exitOrCreate);

                        homepageLogic.createProject(projectName, projectDescription);

                        homepageReload();

                        homepageCreateProjectDialog.close();
                }

            });

        });



    }

    /* ******************************************************************************** */
    function loadProjectSearchResults(foundProjects) {

        domUtil.removeElementChildren(homepageProjectListContainer);

        foundProjects.forEach((project) => {

            const projectButton = createProjectButtonElement(project);

            homepageProjectListContainer.appendChild(projectButton);

        });

        addEraseSearchResultsButton(homepageProjectListContainer);

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

    function homepageReload() {
        loadHomepageProjectList();
        loadProjectSearchDatalist();
        loadGlobalProject();
    }

    function createProjectButtonElement(projectInstance) {
        const projectButton = document.createElement("button");
        projectButton.textContent = projectInstance.name;
        projectButton.setAttribute("data-project-id", projectInstance.id);
        projectButton.setAttribute("class", "projectButton");

        return projectButton;
    }

    function loadProjectData(projectId) {
        // remove dialog children first except buttons
        domUtil.removeElementChildren(loadedProjectData);

        const projectToLoad = homepageLogic.getProjectById(projectId);

        const projectName = document.createElement("h2");
        projectName.textContent = projectToLoad.name;

        const projectDescription = document.createElement("p");
        projectDescription.textContent = projectToLoad.description;

        const tasksContainer = document.createElement("div");
        tasksContainer.setAttribute("class", "tasksContainer");

        projectToLoad.getTasks().forEach((task) => {

            const taskCard = document.createElement("div");
            taskCard.setAttribute("class", "taskCard");

            const taskCheckbox = document.createElement("input");
            taskCheckbox.setAttribute("type", "checkbox");
            taskCheckbox.setAttribute("id", task.taskId);

            const taskTitle = document.createElement("p");
            taskTitle.textContent = task.title;
            taskTitle.setAttribute("class", "taskTitle");

            const taskDueDate = document.createElement("p");
            taskDueDate.textContent = task.dueDate;
            taskDueDate.setAttribute("class", "taskDueDate");

            taskCard.append(taskCheckbox, taskTitle, taskDueDate);

            tasksContainer.appendChild(taskCard);

        });

        loadedProjectData.append(projectName, projectDescription, tasksContainer);
    }

    return { loadHomepageProjectList, loadProjectSearchDatalist, loadHomepageEventListeners, loadGlobalProject };

})();

export { homePageDOM };