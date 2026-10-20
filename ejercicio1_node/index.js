const config =  require('./config.json');
const http = require('http');
const os = require('os');
const port = 3002;

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, World!</h1>');
});


let version = process.version;
server.listen(port, () => {

let system = os.platform();
let arch  = process.arch;

console.log(`Server running at port ${port}`);

console.log(`Sistema:${system}`)
console.log(`Arquitectura:${arch}`)
console.log(`node version:${version}`);

setInterval(()=> {
let cpu = process.cpuUsage();
let memory = (os.totalmem() - os.freemem())/(1024*1024*1024);
let systemTime = os.uptime();
let nodeTime = process.uptime();
console.log(`Mostrando info de intervalos,modificar config.json para elegir que mostrar y que no \n`);
  if(config.show.memory){
    console.log(`memory used ${memory.toFixed(2)} GB`);
  }
  if(config.show.cpu){
    console.log(`CPU:${JSON.stringify(cpu)}`);
  }
  if(config.show.systemUptime){
    console.log(`tiempo del sistema vivo:${systemTime.toFixed(2)}`);
  }
  if(config.show.nodeUptime){
    console.log(`tiempo de node vivo ${nodeTime.toFixed(2)}`);
  }
  console.log(`\n`)
  }
,config.intervalSeconds * 1000);



});