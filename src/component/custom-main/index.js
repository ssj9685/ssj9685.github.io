import { CustomElement } from "/src/component/common/custom.js";

class CustomMain extends CustomElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await super.connectedCallback();
  }
}
window.customElements.define("custom-main", CustomMain);
