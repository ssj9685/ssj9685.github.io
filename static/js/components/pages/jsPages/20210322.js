class Js20210322 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210322

            Multiple peer connection을 실습하였다.
            이에 따라 좀 더 효율적으로 리팩토링을 진행하였다.
            전체적인 peer connection의 생성과 동작을 일반화하였다.
            <div>
                <style>
                    .flexAround{
                        display:flex;
                        justify-content:space-around;
                    }
                </style>
                <div class="flexAround"></div>
                <div style="display:flex;">
                    <button id="createbtn">create</button>
                    <button id="joinbtn">join</button>
                    <button id="hangupbtn">Hang Up</button>
                </div>
            </div>
        `
        shadow.appendChild(div);
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

    webRtcHandler = () => {
        const shadow = this.getShadow();
        const webRtc = window.webRtcService;
        const createbtn = shadow.getElementById('createbtn');
		const joinbtn = shadow.getElementById('joinbtn');
		const hangupbtn = shadow.getElementById('hangupbtn');
        createbtn.addEventListener('click', webRtc.createLocalPeer);
        joinbtn.addEventListener('click', webRtc.createRemotePeer);
        hangupbtn.addEventListener('click', webRtc.closeAllPeerConnection);
    }
}
customElements.define('js-20210322',Js20210322);