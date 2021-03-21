class WebRTCService{
	constructor(){
		this.localStream = null;
		this.pcLocal = null;
		this.pcRemote = null;
		this.pcLocal2 = null;
		this.pcRemote2 = null;
		this.peerConnectionDatas = {};
		this.webRtcPeers = [];
	}
	
	localVideoStart = localVideo => {
		navigator.mediaDevices.getUserMedia(
			{
				audio: true,
				video: true
			}
		)
		.then(stream => {
            localVideo.srcObject = stream;
            this.localStream = stream;
		});
	}
	
	callToRemotePeer = videoElements => {
		const configuration = {};
		this.initCallWithVideo(videoElements.webRtcRemoteVideo, configuration);
		this.initCallWithVideo(videoElements.webRtcRemoteVideo2, configuration);
	}

	initCallWithVideo = (video, configuration) => {
		let local, remote;
		[local, remote] = this.createLocalAndRemotePeer(configuration);
		remote.addEventListener('track', e=>this.onAddTrack(e,video));
		this.localStream.getTracks()
		.forEach(track => {
			local.addTrack(track, this.localStream);
		});
		this.createOfferAndAnswer(local, remote);
	}

	createLocalAndRemotePeer = (configuration) => {
		const local = new RTCPeerConnection(configuration);
		local.addEventListener('icecandidate', e=>e.candidate?remote.addIceCandidate(e.candidate):null);
		const remote = new RTCPeerConnection(configuration);
		remote.addEventListener('icecandidate', e=>e.candidate?local.addIceCandidate(e.candidate):null);
		this.webRtcPeers.push({local:local, remote:remote})
		return [local, remote];
	}

	createOfferAndAnswer = (local,remote) => {
		local.createOffer()
		.then(desc => {
			local.setLocalDescription(desc);
			remote.setRemoteDescription(desc);
		})
		.then(() => {
			remote.createAnswer()
			.then(desc => {
				local.setRemoteDescription(desc);
				remote.setLocalDescription(desc);
			});
		});
	}

	onAddTrack = (e,video) => {
		if (video.srcObject !== e.streams[0]) {
			video.srcObject = e.streams[0];
		}
	}
	
	closeAllPeerConnection = () => {
		this.webRtcPeers.forEach(peer => {
			peer.local.close();
			peer.remote.close();
		})
		this.webRtcPeers = [];
	}
}