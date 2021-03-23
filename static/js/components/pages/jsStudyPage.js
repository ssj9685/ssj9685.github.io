scripter("components/shadowElement/squareElement.js");

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
            code {
                color: white;
                background-color: gray;
                border-radius: 3px;
                font-family: courier, monospace;
                padding: 0 3px;
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
                    <button id="customElementAddButton">커스텀엘리먼트추가</button>
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
                    <div id="workerMultiplyResult">
                </div>
                <div>
                    20210320

                    전반적인 코드 리펙토링 및 webRTC 실습을 진행하였다.
                    현재는 local에 두 개의 peer를 연결했다.
                    더 나아가 stun, turn 서버를 구축하고 외부 주소와 peer를 연결하는 실습을 진행할 것이다.

                    20210322

                    Multiple peer connection을 실습하였다.
                    이에 따라 좀 더 효율적으로 리팩토링을 진행하였다.
                    전체적인 peer connection의 생성과 동작을 일반화하였다.
                    <div>
                        <style>
                            video{
                                --width:33%;
                                width:var(--width);
                                height:calc(var(--width) * 0.75);
                            }
                            .flexAround{
                                display:flex;
                                justify-content:space-around;
                            }
                        </style>
                        <div class="flexAround">
                            <video id="webRtcLocalVideo" playsinline autoplay muted></video>
                            <video id="webRtcRemoteVideo" playsinline autoplay></video>
                            <video id="webRtcRemoteVideo2" playsinline autoplay muted></video>
                        </div>
                        <div style="display:flex;">
                            <button id="webRtcStartButton">Start</button>
                            <button id="webRtcCallButton">Call</button>
                            <button id="webRtcHangupButton">Hang Up</button>
                        </div>
                    </div>
                </div>
                <div>
                    20210323

                    webrtcservice 리팩토링 및 negotiation event시의 외부 로직을 변경하였다.
                    negotiation event시에 remote 부분은 외부에서 호출되는 부분으로 websocket과의 연동이 필요하다.
                    또한 현재는 call 버튼을 누를 때마다 추가 피어를 구성하는데 이 버그를 수정하여야 한다.

                    밑의 내용은 서버측으로 추후에 따로 분리해야겠다.
                    nodejs를 활용하여 static 서버를 구축하였다.
                    도메인 또한 등록하였는데 freenom이라는 곳에서 무료로 등록하였다.
                    certbot을 활용하여 ssl 인증서를 받았다.
                    <code>certbot certonly -d shindev.ml --manual --preferred-challenges dns</code>
                    명령어를 실행하면 아래와 같이 나오는데 dns 관리하는 곳으로 가서 해당하는 값으로 TXT 레코드 추가하면 된다.
                    <img src="static/img/certbotCmd.png"/>
                </div>
            </div>
        `
        shadow.appendChild(style);
        shadow.appendChild(div);
        this.customElementAddHandler();
        this.workerHandler();
        this.webRtcHandler();
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

    workerHandler = () => {
        const shadow = this.getShadow();
        if (window.Worker) {
            const multiplyWorker = window.workerService.multiplyWorker;

            const firstMulNum = shadow.getElementById('firstMulNum');
            const secondMulNum = shadow.getElementById('secondMulNum');
            const workerMultiplyResult = shadow.getElementById("workerMultiplyResult");

            firstMulNum.addEventListener('change', () => {
              multiplyWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
            secondMulNum.addEventListener('change', () => {
              multiplyWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
    
            multiplyWorker.addEventListener('message',e => {
                workerMultiplyResult.textContent = e.data;
            })
        }
        else {
            console.log('not supported');
        }
    }

    webRtcHandler = () => {
        const shadow = this.getShadow();
        const webRtc = window.webRtcService;
        const webRtcStartButton = shadow.getElementById('webRtcStartButton');
		const webRtcCallButton = shadow.getElementById('webRtcCallButton');
		const webRtcHangupButton = shadow.getElementById('webRtcHangupButton');
		const webRtcLocalVideo = shadow.getElementById('webRtcLocalVideo');
		const webRtcRemoteVideo = shadow.getElementById('webRtcRemoteVideo');
        const webRtcRemoteVideo2 = shadow.getElementById('webRtcRemoteVideo2');
        const videoElements = {
            "webRtcRemoteVideo":webRtcRemoteVideo,
            "webRtcRemoteVideo2":webRtcRemoteVideo2
        };
        webRtcStartButton.addEventListener('click', ()=>webRtc.localVideoStart(webRtcLocalVideo));
        webRtcCallButton.addEventListener('click', ()=>webRtc.callToRemotePeer(videoElements));
        webRtcHangupButton.addEventListener('click', webRtc.closeAllPeerConnection);
    }
}