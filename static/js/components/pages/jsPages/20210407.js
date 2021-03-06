class Js20210407 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        this.websocket = null;
        const div = document.createElement('div');
        div.innerHTML = `
            20210407
            websocket handler practice
            <textarea id="wsMsgText"></textarea>
            <button id="wsSendMsgBtn">Send message</button>

            20210408
            아 아이폰 진심 옛날 안드로이드 보다도 못하다.
            웹소캣 연결에 버그있음 자동으로 연결 끊김 아 2시간 버렸네
            암튼 이제 offer를 websocket을 통해서 모든 client에 전달
            그 후 client 수를 n이라 하면
            각 client 마다 peer connection 갯수는 n-1(n>1)
            서버에서 이 n을 알려준다. 메세지로 받은 client 개수만큼
            peer connection n-2 만큼 추가 생성
        `
        shadow.appendChild(div);
        this.webSocketEventHandler();
    }
    connectedCallback() {
        
    }

    disconnectedCallback() {
        this.websocket.close();
    }

    adoptedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }

    webSocketEventHandler = () => {
        const shadow = this.getShadow();
        const wsSendMsgBtn = shadow.getElementById("wsSendMsgBtn");
        const wsMsgText = shadow.getElementById("wsMsgText");

        const keyMap = {
            shift:{
                pressed:false
            }
        };
        const wsConnect = () => {
            if(!this.websocket){
                this.websocket = new WebSocket("wss://chat.yatata.xyz/wss");
                this.websocket.addEventListener('open',()=>this.websocket.send("connected!"));
                this.websocket.addEventListener('message',e=>{
                    console.log(e.data);
                });
                this.websocket.addEventListener('error',e=>{

                })
                wsSendMsgBtn.addEventListener('click',()=>{
                    this.websocket.send(wsMsgText.value)
                });
            }
        }
        wsConnect();
        wsMsgText.addEventListener('keydown',e=>{
            switch(e.key){
                case "Shift":
                    keyMap.shift.pressed = true;
                    break;
                case "Enter":
                    e.preventDefault();
                    if(keyMap.shift.pressed){
                        wsMsgText.value += '\n';
                    }
                    else{
                        wsSendMsgBtn.click();
                    }
                    break;
                default:
            }
        });
        wsMsgText.addEventListener('keyup',e=>{
            switch(e.key){
                case "Shift":
                    keyMap.shift.pressed = false;
                    break;
                default:
            }
        })
    }
}
customElements.define('js-20210407',Js20210407);