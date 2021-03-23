class WebRTCService{
	constructor(){
		this.localStream = null;
		this.webRtcPeers = new Map();
		this.outBoundPeers = new Map();
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
				this.initLocalPeer(videoElements.webRtcRemoteVideo2);
			})
		}
		else{
			this.initLocalPeer(videoElements.webRtcRemoteVideo);
			this.initLocalPeer(videoElements.webRtcRemoteVideo2);
		}
	}

	/**
	 * Always create new peer have to fix it.
	 */
	initLocalPeer = video => {
		const local = new RTCPeerConnection();
		local.video = video;
		this.localStream.getTracks()
		.forEach(track => {
			local.addTrack(track, this.localStream);
		});
		local.addEventListener('negotiationneeded', this.onNegotiationNeeded);
		local.addEventListener('icecandidate', this.onIceCandidate);
		this.webRtcPeers.set(local, null);
	}

	onNegotiationNeeded = e => {
		const local = e.target;
		const remote = this.sendToOutBound(local);
		local.createOffer()
		.then(desc => local.setLocalDescription(desc))
		.then(() => remote.setRemoteDescription(local.localDescription))
		.then(() => {
			remote.createAnswer()
			.then(desc => remote.setLocalDescription(desc))
			.then(() => local.setRemoteDescription(remote.localDescription));
		})
		this.webRtcPeers.set(local, remote);
		this.webRtcPeers.set(remote, local);
	}

	onIceCandidate = e => {
		const pc = this.webRtcPeers.get(e.target);
		if(e.candidate){
			pc.addIceCandidate(e.candidate);
		}
	}

	sendToOutBound = remote => {
		let local;
		if(!this.outBoundPeers.get(remote)){
			local = new RTCPeerConnection();
			this.outBoundPeers.set(local, remote);
			this.outBoundPeers.set(remote, local);
		}
		else{
			local = this.webRtcPeers.get(remote);
		}
		local.addEventListener('track', e => this.onAddTrack(e, remote.video));
		local.addEventListener('icecandidate', this.onIceCandidate);
		return local;
	}

	onAddTrack = (e,video) => {
		if (video.srcObject !== e.streams[0]) {
			video.srcObject = e.streams[0];
		}
	}
	
	closeAllPeerConnection = () => {
		for(const [local, remote] of this.webRtcPeers){
			local.close();
			remote.close();
		}
		this.webRtcPeers.clear();
	}
}