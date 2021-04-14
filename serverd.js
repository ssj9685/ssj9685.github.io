const { spawn } = require('child_process');
const Logger = require('./server/module/logger').Logger;
const pidLog = new Logger("./server/pid").log;
const log = new Logger("./server/log").log;

/**
 * Run on background process (daemon server)
 */
const serverd = spawn(process.argv[0], ['server.js'], {
  detached: true,
  stdio: false,
  shell: true
});

log("open daemon with pid:" + serverd.pid);
pidLog("pid:"+serverd.pid);

serverd.unref();