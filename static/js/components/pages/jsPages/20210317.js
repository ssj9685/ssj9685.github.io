class Js20210317 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210317

            커스텀 엘리먼트 활용 SPA 흉내를 내었다.
            현재는 링크를 클릭하면 해당 컨텐츠를 커스텀 엘리먼트로 교체하는 방식으로 하였다.
            그리고 scripter라는 함수를 만들어 DOMContentLoaded 후에 script tag를 body에 append하고
            페이지 공통 동작 함수는 object의 getter를 활용하여 이벤트 바인딩을 모두 마친 후에
            해당 script tag를 제거하는 방식으로 CORS에서의 js import 방식을 구현하였고,
            커스텀 엘리먼트는 추가되는 동시에 script를 제거하였다.
            지금 페이지를 나누는 이 스트링을 추후에 js 파일로 나누어서 append하는 방식을 고려중이다.
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