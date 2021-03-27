const fs = require('fs');
function Logger(fileName){
	this.log = msg => {
		return new Promise((res,rej)=>{
			fs.appendFile(fileName, `\n[${(new Date()).toISOString()}]${msg}`, err=>{
				if(err)throw err;
				res(true);
			})
		})
	}
}
exports.Logger = Logger;