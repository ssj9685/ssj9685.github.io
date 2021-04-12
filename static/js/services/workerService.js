class WorkerService{
	constructor(){
		
	}
	workerUrl =  (type,func) => {
		const str = func.toString();
		const blob = new Blob([`${type}=${str}`]);
		return URL.createObjectURL(blob);
	}
	multiplyWorker = new Worker(this.workerUrl("onmessage",e=>{
		postMessage(e.data[0] * e.data[1])
	}));
}