const port = 9685;
const https = require('https');
const fs = require('fs');

const options = {
	key: fs.readFileSync('./server/ssl/keys/privkey1.pem'),
	cert: fs.readFileSync('./server/ssl/keys/cert1.pem')
};

const mimeLookup = {
	'js': 'text/javascript',
	'css': 'text/css',
	'png': 'image/png'
}

const server = https.createServer(options);

server.on('request',route);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

function route(req, res){
	const {method, url} = req;
	console.log(url);
	if(method === 'GET'){
		switch(url){
			case '/':
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.createReadStream('./index.html').pipe(res);
				break;
			default:
				const extName = url.split('.')[1];
				if(mimeLookup[extName]){
					res.writeHead(200, {'Content-Type': mimeLookup[extName]});
					fs.createReadStream('.' + url).pipe(res);
				}
				else{
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end("404 page not found");
				}
				break;
		}
	}
	else if(method === 'POST'){

	}
}
//method url callback의 형태로 추가할 수 있는 함수구현

const http = require('http');
http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
