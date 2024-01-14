/**
 * @param {string} src
 * @returns {Promise<HTMLTemplateElement | null>}
 */
const importTemplate = async (src) => {
  const response = await fetch(src);
  const html = await response.text();

  const domParser = new DOMParser();

  const dom = domParser.parseFromString(html, "text/html");
  const head = dom.head;

  const template = /** @type {HTMLTemplateElement} */ (head.firstChild);

  return template;
};

export class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  insertShadow() {
    const script = this.template.querySelector("script");

    if (script) {
      const newScript = document.createElement("script");
      newScript.innerHTML = `{
          const shadow = document.getElementById('${this.id}').shadowRoot;
          ${script.innerHTML}
        }`;
      this.template.removeChild(script);
      this.template.append(newScript);
    }
  }

  async connectedCallback() {
    const componentName = this.tagName.toLowerCase();
    const src = `/src/component/${componentName}/template.html`;

    const dom = await importTemplate(src);

    if (!dom) return;

    this.template = dom.content;
    this.id = crypto.randomUUID();
    this.insertShadow();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(this.template.cloneNode(true));
  }
}

window.customElements.define("custom-header", class extends CustomElement {});
window.customElements.define("custom-aside", class extends CustomElement {});
window.customElements.define("custom-main", class extends CustomElement {});
window.customElements.define("custom-footer", class extends CustomElement {});
