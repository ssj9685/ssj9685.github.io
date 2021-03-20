class WebRTCService{
	constructor(){
		this.localStream = null;
		this.pc1 = null;
		this.pc2 = null;
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
	
	callToRemotePeer = remoteVideo => {
		const configuration = {};
		this.pc1 = new RTCPeerConnection(configuration);
		this.pc1.addEventListener('icecandidate', this.onIceCandidate);
		this.pc2 = new RTCPeerConnection(configuration);
		this.pc2.addEventListener('icecandidate', this.onIceCandidate);
        this.gotRemoteStream = e => {
            if (remoteVideo.srcObject !== e.streams[0]) {
                remoteVideo.srcObject = e.streams[0];
            }
        }
		this.pc2.addEventListener('track', this.gotRemoteStream);
		this.localStream.getTracks()
		.forEach(track => this.pc1.addTrack(track, this.localStream));
		this.pc1.createOffer(
			{
				offerToReceiveAudio: 1,
				offerToReceiveVideo: 1
			}
		)
		.then(offer=>this.onCreateOffer(offer));
	}
	
	onCreateOffer = desc => {
		this.pc1.setLocalDescription(desc);
		this.pc2.setRemoteDescription(desc);
		this.pc2.createAnswer()
		.then(desc=>{
			this.pc2.setLocalDescription(desc);
			this.pc1.setRemoteDescription(desc);
		});
	}
	
	onIceCandidate = e => {
		if(e.candidate){
			const otherPc = (e.target === this.pc1) ? this.pc2 : this.pc1
			otherPc.addIceCandidate(e.candidate);
		}
	}
	
	closeAllPeerConnection = () => {
		this.pc1.close();
		this.pc2.close();
		this.pc1 = null;
		this.pc2 = null;
	}
}