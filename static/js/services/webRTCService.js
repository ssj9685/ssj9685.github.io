class WebRTCService{
	constructor(){
		this.localStream = null;
		this.webSocket = null;
	}
	
	setLocalStream = () => {
		if(!this.localStream){
			return navigator.mediaDevices.getUserMedia(
				{
					audio: true,
					video: true
				}
			)
			.then(stream => {
				this.localStream = stream;
			});
		}
	}
	
	callToRemotePeer = videoElements => {
		if(!this.localStream){
			this.setLocalStream()
			.then(()=>{
				this.initLocalPeer(videoElements.webRtcRemoteVideo);
				// this.initLocalPeer(videoElements.webRtcRemoteVideo2);
			})
		}
		else{
			this.initLocalPeer(videoElements.webRtcRemoteVideo);
			// this.initLocalPeer(videoElements.webRtcRemoteVideo2);
		}
	}

	initLocalPeer = video => {
		this.local = new RTCPeerConnection();
		const local = this.local;
		local.video = video;
		this.localStream.getTracks()
		.forEach(track => {
			local.addTrack(track, this.localStream);
		});
		local.addEventListener('negotiationneeded', this.onNegotiationNeeded);
	}

	onNegotiationNeeded = e => {
		const local = e.target;
		local.createOffer()
		.then(description => {
			local.setLocalDescription(description);
			if(!this.webSocket){
				this.webSocket = new WebSocket("wss://shindev.ml/webrtc");
				this.webSocket.addEventListener('open',()=>{
					this.webSocket.send(JSON.stringify(description));
				});
				this.webSocket.addEventListener('message',e=>{
					let desc;
					if(typeof e.data === "string"){
						desc = JSON.parse(e.data);
					}
					if(desc){
						if(desc.type === "offer"){
							if(!local.remoteDescription){
								local.setRemoteDescription(desc)
								.then(()=>{
									local.createAnswer().then(desc=>{
										this.webSocket.send(JSON.stringify(desc));
										local.setLocalDescription(desc);
									});
								})
							}
							else{
								const video = document.createElement('video');
								document.body.appendChild(video);
								video.playsInline = true;
								video.muted = true;
								video.autoplay = true;
								this.initLocalPeer(video);
							}
						}
						else if(desc.type === "answer"){
							local.setRemoteDescription(desc);
						}
					}
					local.addEventListener('icecandidate', this.onIceCandidate);
				})
			}
		})
	}

	onIceCandidate = e => {
		if(e.candidate){
			//e.target.addIceCandidate(e.candidate);
		}
	}
	
	closeAllPeerConnection = () => {
		this.local.close();
	}
}