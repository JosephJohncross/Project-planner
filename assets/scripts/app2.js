class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);

    element.scrollIntoView();
  }
}

class Component {
  constructor(hostElement, positioning) {
    if (hostElement) {
      this.hostElement = document.getElementById(hostElement);
    } else this.hostElement = document.body;

    this.positioning = positioning;
  }

  attach() {
    this.hostElement.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}

class Tooltip extends Component {
  constructor(closeNotificationFunction, toolTipText, hostElement) {
    super(hostElement);
    this.text = toolTipText;
    this.closeNotifier = closeNotificationFunction;
    this.create();
  }
  closeToolTip = () => {
    this.remove();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "tooltip";
    tooltipElement.textContent = this.text;

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElPosHeight = this.hostElement.clientHeight;
    const parentScroll =
      this.hostElement.closest(".scroll-container").scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElPosHeight - parentScroll - 10;

    tooltipElement.style.left = x + "px";
    tooltipElement.style.top = y + "px";

    tooltipElement.addEventListener("click", this.closeToolTip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasTooltipActive = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.connectMoreInfoButton();
    this.updateProjectListHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasTooltipActive) {
      return;
    }
    let projectElement = document.getElementById(this.id);
    let toolTipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasTooltipActive = false;
      },
      toolTipText,
      this.id
    );
    tooltip.attach();
    this.hasTooltipActive = true;
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });
  }

  connectMoreInfoButton() {
    let showMoreElement = document.getElementById(this.id);
    let moreInfoBtn = showMoreElement.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const switchBtnElement = document.getElementById(this.id);
    let switchBtn = switchBtnElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }

  update(updateProjectListHandlerFn, type) {
    this.updateProjectListHandler = updateProjectListHandlerFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
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

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectlist = new ProjectList("finished");

    activeProjectList.setSwitchHandlerFunction(
      finishedProjectlist.addProject.bind(finishedProjectlist)
    );
    finishedProjectlist.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
