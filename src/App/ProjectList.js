import {ProjectItem} from './ProjectItem.js'
import {DOMHelper} from '../Utility/DOMHelper.js'

export class ProjectList {
  projects = [];
  constructor(typeOfProject) {
    this.typeOfProject = typeOfProject;
    const prjItems = document.querySelectorAll(`#${typeOfProject}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(
          prjItem.id,
          this.switchProject.bind(this),
          this.typeOfProject
        )
      );
    }
    this.connectDroppable();
  }

  addProject(project) {
    console.log(project);
    this.projects.push(project);
    console.log(this.typeOfProject);
    DOMHelper.moveElement(project.id, `#${this.typeOfProject}-projects ul`);
    project.update(this.switchProject.bind(this), this.typeOfProject);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  connectDroppable() {
    const dragArea = document.querySelector(
      `#${this.typeOfProject}-projects .scroll-container`
    );

    dragArea.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
      dragArea.parentElement.classList.add("droppable");
    });

    dragArea.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });

    dragArea.addEventListener("dragleave", (event) => {
      if (
        event.relatedTarget.closest(
          `#${this.typeOfProject}-projects .scroll-container`
        ) !== dragArea
      ) {
        dragArea.parentElement.classList.remove("droppable");
      }
    });

    dragArea.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === prjId)) {
        dragArea.parentElement.classList.remove("droppable");
        return;
      }
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();

      dragArea.parentElement.classList.remove("droppable");
      event.preventDefault();
    });
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    this.projects.splice(projectIndex, 1);
  }
}
