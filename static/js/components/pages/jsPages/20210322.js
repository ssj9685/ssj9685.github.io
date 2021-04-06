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