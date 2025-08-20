// CÓDIGO DE ITERACCIÓN CON EL USER Y CON EL DOM
// hacer la función de load event listeners cuando el dom esté cargado?
import { projectsArray, globalTasksArray } from "./data";
import { homePageModule } from "./logic";

const homePageDOM = (function () {

    const homepageProjectListContainer = document.querySelector(".homepageProjectListContainer");


    const loadHomepageProjectList = function () {

        removeElementChildren(homepageProjectListContainer);


        projectsArray.forEach((project) => {

            const projectButton = document.createElement("button");
            projectButton.textContent = project.name;
            projectButton.setAttribute("data-projectId", project.id);

            homepageProjectListContainer.appendChild(projectButton);

        });

    }

    const loadProjectSearchDatalist = function () {

        const projectDatalist = document.querySelector("#projectList");

        projectsArray.forEach((project) => {

            const option = document.createElement("option");
            option.textContent = project.name;

            projectDatalist.appendChild(option);

        });


    }

    const loadGlobalProject = function () {

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

            const foundProjects = homePageModule.searchProject(projectName);

            if (foundProjects.length > 0) {

                loadProjectSearchResults(foundProjects);

            } else {
                // todo: mensaje "no se ha encontrado ningún proyecto con ese nombre"
                alert("We couldn't find any project with that name.");
                loadHomepageProjectList();
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