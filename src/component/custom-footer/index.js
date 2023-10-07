import { CustomElement } from "/src/component/common/custom.js";

class CustomFooter extends CustomElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await super.connectedCallback();

    const footer = this.shadow.querySelector("footer");
    const year = new Date().getFullYear();
    footer.innerHTML = `&copy; ${year} <a href="https://github.com/ssj9685">ssj9685</a> All rights reserved.`;
  }
}
window.customElements.define("custom-footer", CustomFooter);
