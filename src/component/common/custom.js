const importTemplate = async (src = "") => {
  const response = await fetch(src);
  const html = await response.text();

  const dom = new DOMParser().parseFromString(html, "text/html").head
    .firstChild;
  dom.id = src;

  return dom;
};

export class CustomElement extends HTMLElement {
  shadow;
  template;

  constructor() {
    super();
  }

  async connectedCallback() {
    const componentName = this.tagName.toLowerCase();
    const src = `/src/component/${componentName}/template.html`;
    const dom = await importTemplate(src);

    this.shadow = this.attachShadow({ mode: "open" });
    this.template = dom.content;
    this.shadow.appendChild(this.template.cloneNode(true));
  }
}
