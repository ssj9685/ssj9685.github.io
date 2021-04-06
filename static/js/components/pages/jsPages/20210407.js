class Js20210407 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210407
            websocket handler practice
            <button id="wsSendMsgBtn">Send message</button>
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

    webSocketEventHandler = () => {
        const shadow = this.getShadow();
        let ws = new WebSocket("wss://shindev.ml/wss");
        ws.addEventListener('open',()=>ws.send("connected!"));
        ws.addEventListener('message',e=>console.log(e));
        const wsSendMsgBtn = shadow.getElementById("wsSendMsgBtn");
        wsSendMsgBtn.addEventListener('click',()=>ws.send("message!!"));
    }
}