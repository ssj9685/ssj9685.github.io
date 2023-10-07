import { CustomElement } from "/src/component/common/custom.js";

class CustomAside extends CustomElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}
window.customElements.define("custom-aside", CustomAside);
