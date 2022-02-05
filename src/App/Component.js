export class Component {
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
