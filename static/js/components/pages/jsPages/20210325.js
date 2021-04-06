class Js20210325 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210325
            <img src="static/img/formatData.png"/>
            nodejs에서 http to https redirect와 websocket 서버를 외부 모듈 없이 구축하였다.
            websocket 연결을 위해서 서버의 upgrade 이벤트를 바인딩하고 http 프로토콜을 이용한 websocket handshake을 구현하였으며
            초기 연결 확정을 위해 data frame을 buffer를 통하여 직접 구현하였다.
            MDN Web Docs에 설명이 잘 되어있어서 참고하였다.
            이제 이 websocket을 webRTC의 remote 부분 구현시 이용하면 된다.
        `
        shadow.appendChild(div);
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