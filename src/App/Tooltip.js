import {Component} from './Component.js'

export class Tooltip extends Component {
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
