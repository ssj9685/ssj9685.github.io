class Js20210204 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210204
            
            자바스크립트 공부하자.
            html 파싱후에 대체하는 방법 연구.
            주소에 직접 파일로 접근하지말고 내가 정해준 주소로 갔을 때 해당 화면 랜더링하는 방식으로 변경
            번외로 서비스 워커, WebRTC에 대해 공부하자
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
customElements.define('js-20210204',Js20210204);