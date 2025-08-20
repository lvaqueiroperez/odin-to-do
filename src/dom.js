// CÓDIGO DE ITERACCIÓN CON EL USER Y CON EL DOM
// hacer la función de load event listeners cuando el dom esté cargado?
import { projectsArray, globalTasksArray } from "./data";
import { homePageModule } from "./logic";

function removeElementChildren(element) {

    Array.from(element.children).forEach(child => child.remove());

}

const homePageDOM = (function () {

    const loadHomepageProjectList = function () {

        const homepageProjectListContainer = document.querySelector(".homepageProjectListContainer");

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

    return { loadHomepageProjectList, loadProjectSearchDatalist };

})();

export { homePageDOM };