const staticFilePath = "static/js/"

const scripter = path => {
	if(!document.getElementById(path)){
		const module = document.createElement("script");
		module.id = path;
		module.src = staticFilePath + path;
		document.body.appendChild(module);
	}
	window.addEventListener('load',()=>{
		unscripter(path);
	})
}

const unscripter = path => {
	const module = document.getElementById(path);
	if(module){
		document.body.removeChild(module);
	}
}