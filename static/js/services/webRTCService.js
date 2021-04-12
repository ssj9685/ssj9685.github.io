class WebRTCService{
	constructor(){
		this.localPeers = new Array();
		this.webSocket = new WebSocket("wss://shindev.ml/webrtc");
		this.stream = navigator.mediaDevices.getUserMedia(
			{
				audio: true,
				video: true
			}
		)
	}

	initPeer = () => {
		const pc = new RTCPeerConnection();
		this.localPeers.push(pc);
		pc.addEventListener('icecandidate', this.onIceCandidate);
		return pc;
	}

	createLocalPeer = () => {
		const pc = this.initPeer();
		this.stream.getTracks()
		.forEach(track => {
			pc.addTrack(track, this.stream);
		});
		pc.addEventListener('negotiationneeded',this.localOnNegotiationNeeded);
	}

	createRemotePeer = () => {
		const pc = this.initPeer();
		pc.addEventListener('track', this.onAddTrack);
		pc.addEventListener('negotiationneeded',this.remoteOnNegotiationNeeded);
	}

	onAddTrack = e => {
		const video = document.createElement('video');
		document.body.appendChild(video);
		video.playsInline = true;
		video.muted = true;
		video.autoplay = true;
		if (video.srcObject !== e.streams[0]) {
			video.srcObject = e.streams[0];
		}
	}

	localOnNegotiationNeeded = e => {
		const pc = e.target;
		pc.createOffer()
		.then(description => {
			pc.setLocalDescription(description);
			this.webSocket.send(JSON.stringify(description));
			this.webSocket.addEventListener('message',e=>{
				if(typeof e.data === "string"){
					const desc = JSON.parse(e.data);
					if(desc.type === "answer"){
						pc.setRemoteDescription(desc);
					}
				}
			},{once:true});
		});
	}

	remoteOnNegotiationNeeded = e => {
		const pc = e.target;
		this.webSocket.addEventListener('message',e=>{
			if(typeof e.data === "string"){
				const desc = JSON.parse(e.data);
				if(desc.type === "offer"){
					pc.setRemoteDescription(desc);
					pc.createAnswer()
					.then(description => {
						pc.setLocalDescription(description);
						this.webSocket.send(JSON.stringify(description));
					});
				}
			}
		},{once:true});
	}

	onIceCandidate = e => {
		if(e.candidate){
			this.webSocket.send(JSON.stringify({ice:e.candidate}));
		}
	}
	
	closeAllPeerConnection = () => {
		for(const pc of this.localPeers){
			pc.close();
		}
	}
}