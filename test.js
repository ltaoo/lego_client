var os = require('os');
const cp = require('child_process');

var pty = require('node-pty');

// var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// var ptyProcess = pty.spawn(shell, [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env
// });

// ptyProcess.on('data', function(data) {
//   console.log(data);
// });

// ptyProcess.write('vi\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');

var ls = cp.spawn('ls', ['-a'], {
  cwd: __dirname,
  stdio: 'inherit'
});
// console.log(ls);
// process.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// process.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });

// process.on('close', (code) => {
//     console.log(`子进程退出码：${code}`);
// });
// ptyProcess.on('data', function(data) {
//   console.log(data);
// });
ls.stdin.on('data', (data) => {
    console.log(`stdin inijdfdf: ${data}`);
});
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
ls.on('close', (data) => {
    console.log(`exit: ${data}`);
});
