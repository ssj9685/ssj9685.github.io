const multiplyWorker = {
	workerUrl: func => {
		const str = func.toString();
		const blob = new Blob([`onmessage=${str}`]);
		return URL.createObjectURL(blob);
	},
	get onmessage(){
		const func = e => {
			const result = e.data[0] * e.data[1];
			postMessage(result);
		}
		unscripter("workers/multiplyWorker.js");
		return multiplyWorker.workerUrl(func);
	}
}