class Js20210411 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210411
           
            utf-8과 utf-16에 대하여 공부하였다. 근데 결국 실수로 인한 삽질이였다.
            websocket exchanging data format에 대하여 더욱 깊게 이해할 수 있었다.

        `
        shadow.appendChild(div);
        this.webSocketEventHandler();
    }
    connectedCallback() {
        
    }

    disconnectedCallback() {
        
    }

    adoptedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }
}
customElements.define('js-20210411',Js20210411);