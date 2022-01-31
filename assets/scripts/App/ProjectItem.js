import { DOMHelper } from "../Utility/DOMHelper.js";
// import { Tooltip } from "./Tooltip.js";

export class ProjectItem {
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
    import("./Tooltip.js").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasTooltipActive = false;
        },
        toolTipText,
        this.id
      );
      tooltip.attach();
      this.hasTooltipActive = true;
    });
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
