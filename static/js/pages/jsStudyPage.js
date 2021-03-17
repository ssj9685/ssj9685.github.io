class JsStudyPage extends HTMLElement{
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
                Javascript
            </div>
            <div id="mainContentText">
                <div>
                    20210204
                    
                    자바스크립트 공부하자.
                    html 파싱후에 대체하는 방법 연구.
                    주소에 직접 파일로 접근하지말고 내가 정해준 주소로 갔을 때 해당 화면 랜더링하는 방식으로 변경
                    번외로 서비스 워커, WebRTC에 대해 공부하자
                </div>
                <div id="customElementTestDiv">
                    20210311

                    커스텀 엘리먼트 공부
                    기본적인 Shadow root 기능을 실습하였다.
                    이걸 활용해서 head부분에 들어가는 리소스들도 공통으로 묶어서 관리할 수 있다고 생각한다.
                    또한 로컬 환경에서의 CORS 해결 방안도 프로토콜 측면에서 모색해볼 것이다.
                    <button id="addButton">커스텀엘리먼트추가</button>
                </div>
                <div>
                    20210317

                    커스텀 엘리먼트 활용 SPA 흉내를 내었다.
                    현재는 링크를 클릭하면 해당 컨텐츠를 커스텀 엘리먼트로 교체하는 방식으로 하였다.
                    그리고 scripter라는 함수를 만들어 DOMContentLoaded 후에 script tag를 body에 append하고
                    페이지 공통 동작 함수는 object의 getter를 활용하여 이벤트 바인딩을 모두 마친 후에
                    해당 script tag를 제거하는 방식으로 CORS에서의 js import 방식을 구현하였고,
                    커스텀 엘리먼트는 추가되는 동시에 script를 제거하였다.
                    지금 페이지를 나누는 이 스트링을 추후에 js 파일로 나누어서 append하는 방식을 고려중이다.
                </div>
                <div>
                    20210318

                    웹 워커 실습을 진행하였다.
                    쓰레드와 비슷한 개념으로 작업을 던져놓고 기존 작업을 다시 진행할 수 있어서 효율적인 기술이다.
                    <input type="text" id="firstMulNum" value="0">
                    <input type="text" id="secondMulNum" value="0">
                    <div id="workerMultiplyResult"></div>
            </div>
        `
        shadow.appendChild(style);
        shadow.appendChild(div);
        const addButton = shadow.getElementById("addButton");
        const customElementTestDiv = shadow.getElementById("customElementTestDiv");
        addButton.addEventListener('click', ()=>{
            const indexElement = document.createElement('square-element');
            indexElement.setAttribute('length', '100');
            indexElement.setAttribute('color', 'var(--birthColor)');
            customElementTestDiv.appendChild(indexElement);
        })
        if (window.Worker) {
            const myWorker = new Worker(multiplyWorker.onmessage);

            const firstMulNum = shadow.getElementById('firstMulNum');
            const secondMulNum = shadow.getElementById('secondMulNum');
            const workerMultiplyResult = shadow.getElementById("workerMultiplyResult");

            firstMulNum.addEventListener('change', () => {
              myWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
            secondMulNum.addEventListener('change', () => {
              myWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
    
            myWorker.addEventListener('message',e => {
                workerMultiplyResult.textContent = e.data;
            })
        }
        else {
            console.log('not supported');
        }
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
customElements.define('jsstudy-page', JsStudyPage);
unscripter("pages/jsStudyPage.js");