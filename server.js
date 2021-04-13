/**
 * TODO make function(method, url, callback) like express
 * TODO Add websocket server to client send
 */

const https = require('https');
const crypto=  require('crypto');
const fs = require('fs');

const Logger = require('./server/module/logger').Logger;
const log = new Logger("./server/log").log;

const clients = new Map();

const options = {
	key: fs.readFileSync('./server/ssl/keys/privkey1.pem'),
	cert: fs.readFileSync('./server/ssl/keys/cert1.pem')
};

const mimeLookup = {
	'js': 'text/javascript',
	'css': 'text/css',
	'png': 'image/png'
}

const httpsServer = https.createServer(options);

httpsServer.on('request',onHttpsServerRequest);

httpsServer.on('upgrade', onHttpsServerUpgarde);

httpsServer.on('close', ()=>{
	log("server closed").then(b=>process.exit(b));
});

httpsServer.listen(443, () => log("Server running on port 443"));

function onHttpsServerRequest(req, res){
	const {method, url} = req;
	log("req url:" + url);
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
		}
	}
	else if(method === 'POST'){

	}
}
/**
* Reference
* https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers
*/
function onHttpsServerUpgarde(req, socket){
	const {url} = req;
	switch(url){
		case "/wss":
			websocketHandler(req, socket);
			break;
		case "/webrtc":
			websocketHandler(req, socket, clients);
			break;
		default:
			log("nope");
	}
}

function websocketHandler(req, socket, clients=null){
	if(req.headers["upgrade"] === 'websocket'){
		const magicStr = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		const websocketKey = req.headers["sec-websocket-key"] + magicStr;
		/**
		 * Key from client + magic string and hash(sha1 algo) and encode to base64
		 */
		const key = crypto.createHash("sha1")
					.update(websocketKey)
					.digest("base64");
		socket.write('HTTP/1.1 101 Switching Protocols\r\n'+
				  'Upgrade: websocket\r\n'+
				  'Connection: Upgrade\r\n'+
				  'Sec-WebSocket-Accept: '+key+'\r\n'+
				  '\r\n')
		socket.on('data',encoded=>{
			/**
			 * 1(MASK) 0000010(length) & 0 1111111 for remove mask key
			 */
			let length = encoded[1]&0x7F;
			const mask = Buffer.alloc(4);
			let decoded;
			if(length <= 125){
				decoded = Buffer.alloc(length);
				for(let i=0;i<4;++i)mask[i]=encoded[i+2];
				for(let i=0;i<length;++i)decoded[i] = encoded[i+6] ^ mask[i%4];
				let sendBuf = Buffer.alloc(2);
				sendBuf[0] = 0x81;
				sendBuf[1] = length;
				sendBuf = Buffer.concat([sendBuf, decoded]);
				socket.write(sendBuf);
			}
			else if(length === 126){
				length = encoded.readUInt16BE(2);
				decoded = Buffer.alloc(length);
				for(let i=0;i<4;++i)mask[i]=encoded[i+4];
				for(let i=0;i<length;++i)decoded[i] = encoded[i+8] ^ mask[i%4];
				let sendBuf = Buffer.alloc(4);
				sendBuf[0] = 0x81;
				sendBuf[1] = 126;
				sendBuf[2] = encoded[2];
				sendBuf[3] = encoded[3];
				sendBuf = Buffer.concat([sendBuf, decoded]);
				for(const sock of clients.keys()){
					if(socket!==sock){
						sock.write(sendBuf);
					}
				}
			}
			else if(length === 127){
				length = encoded.readBigUInt64BE(2);
				decoded = Buffer.alloc(length);
				for(let i=0;i<4;++i)mask[i]=encoded[i+8];
				for(let i=0;i<length;++i)decoded[i] = encoded[i+14] ^ mask[i%4];
			}
			//log("Received message: " + decoded.toString('utf8'));
		})
		socket.on('error',e=>{
			console.log(e);
		})
		socket.on('close',()=>{
			if(clients){
				clients.delete(socket);
			}
			log("websocket closed");
		})

		/**
		 * init data frame 1000(FIN) 0010(OP bin)
		 * 0x82 for change readyState connecting to open
		 */
		const buf = Buffer.alloc(2);
		buf[0] = 0x82;
		socket.write(buf);
		if(clients && !clients.has(socket)){
			clients.set(socket,clients.size);
			console.log(clients.size);
		}
	}
}

/**
 * For redirect when client use http
 */
const http = require('http');
http.createServer((req, res) => {
	log("redirect");
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);