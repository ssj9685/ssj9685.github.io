class IndexElement extends HTMLElement{
    static get observedAttributes() {
        return ['color', 'length'];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        this.getShadowDiv = () => div;
        const style = document.createElement('style');
        this.getShadowStyle = () => style;
        shadow.appendChild(style);
        shadow.appendChild(div);
    }
    connectedCallback() {
        console.log('Custom square element added to page.');
        this.updateStyle();
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        console.log('Custom square element attributes changed.');
        this.updateStyle();
    }
    updateStyle(){
        this.getShadowStyle().textContent = `
        div {
            width: ${this.getAttribute('length')}px;
            height: ${this.getAttribute('length')}px;
            background-color: ${this.getAttribute('color')};
        }
        `;
    }
}
customElements.define('index-element', IndexElement);