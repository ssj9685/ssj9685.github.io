class Js20210320 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210320

            전반적인 코드 리펙토링 및 webRTC 실습을 진행하였다.
            현재는 local에 두 개의 peer를 연결했다.
            더 나아가 stun, turn 서버를 구축하고 외부 주소와 peer를 연결하는 실습을 진행할 것이다.
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