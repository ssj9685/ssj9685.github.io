const fs = require('fs');
const Logger = require('./server/module/logger').Logger;
const log = new Logger("./server/log").log;

const regex = new RegExp("pid:\\d*",'g');
fs.readFile("./server/pid","utf-8",(err,data)=>{
    if(err)throw err;
    const pids = [...data.matchAll(regex)];
    const pid = Number(pids[pids.length-1][0].replace("pid:",""));
    if(!isNaN(pid)){
        log("close daemon with pid:" + pid);
    }
    process.kill(pid);
})