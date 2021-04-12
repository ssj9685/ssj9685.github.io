class Js20210311 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210311

            커스텀 엘리먼트 공부
            기본적인 Shadow root 기능을 실습하였다.
            이걸 활용해서 head부분에 들어가는 리소스들도 공통으로 묶어서 관리할 수 있다고 생각한다.
            또한 로컬 환경에서의 CORS 해결 방안도 프로토콜 측면에서 모색해볼 것이다.
            <button id="customElementAddButton">커스텀엘리먼트추가</button>
            <div id="customElementTestDiv"></div>
        `
        shadow.appendChild(div);
        this.customElementAddHandler();
    }
    connectedCallback() {
        
    }

    disconnectedCallback() {
        
    }

    adoptedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }

    customElementAddHandler = () => {
        const shadow = this.getShadow();
        const customElementAddButton = shadow.getElementById("customElementAddButton");
        const customElementTestDiv = shadow.getElementById("customElementTestDiv");
        customElementAddButton.addEventListener('click', ()=>{
            const indexElement = document.createElement('square-element');
            indexElement.setAttribute('length', '100');
            indexElement.setAttribute('color', 'var(--birthColor)');
            customElementTestDiv.appendChild(indexElement);
        })
    }
}
customElements.define('js-20210311',Js20210311);