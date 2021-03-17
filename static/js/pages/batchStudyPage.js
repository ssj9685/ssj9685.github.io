class BatchStudyPage extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const style = document.createElement('style');
        style.innerHTML = `
            #mainContentTitle{
                border-bottom: 0.1rem solid black;
                padding:0.8rem;
            }
            #mainContentText{
                padding:0.8rem;
                white-space: pre-line;
                overflow: auto;
            }
        `
        const div = document.createElement('div');
        div.style.height = "100vh";
        div.style.overflow = "auto";
        div.innerHTML = `
            <div id="mainContentTitle">
                CMD text editor
            </div>
            <div id="mainContentText">
                <div>
                    20210204
                    
                    입력 상황과 탐색상황을 나누어 batch 와 VBS를 활용한 텍스트 에디터를 구상하였다.
                    이를 토대로 윈도우 창을 띄우는 코드를 작성한 후에 gcc를 이용하여 컴파일한다.
                    copy와 echo, if, for 기본 cmd 명령어를 활용하여 txt 파일을 만들고, VBS를 활용하여 키 값을 전송한다.
                    문제점이 있다면 사용자가 입력하는 값과 미리 입력한 키 전송값을 비교하는 부분이다.
                </div>
            </div>
        `
        shadow.appendChild(style);
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
customElements.define('batchstudy-page', BatchStudyPage);
unscripter("pages/batchStudyPage.js");