import { CustomElement } from "/src/component/common/custom.js";

class CustomHeader extends CustomElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}
window.customElements.define("custom-header", CustomHeader);
