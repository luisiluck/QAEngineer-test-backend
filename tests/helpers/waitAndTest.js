const http = require('http');
const { exec } = require('child_process');
const { Command } = require('commander');

const options = new Command()
  .version('0.0.1')
  .option('-e, --environment <type>', 'Evironment of the System Under Tests', 'local')
  .option('-c, --collection <type>', 'Collection of the tests', 'backend')
  .option('-d, --data <type>', 'Data for the tests', 'data')
  .option('-w, --wait <number>', 'Max wait time for the server to be ready', 15000)
  .option('-i, --interval <number>', 'Interval between server checks', 1000)
  .parse(process.argv).opts(); 

const SERVER_URL = require(`../environments/${options.environment}.json`).values.find(value => value.key === 'baseUrl').value;

let waitedTime = 0;

// Is server active?
function checkServerStatus() {
  http.get(SERVER_URL, () => {
    console.log('Server is running.');
    runTests();
  }).on('error', () => {
    if (waitedTime >= options.wait) {
      console.error("Server is not ready. Timeout reached.");
      process.exit(1);
    } else {
      waitedTime += options.interval;
      console.log("Waiting for Server...");
      setTimeout(checkServerStatus, options.interval);
    }
  });
}

// Run tests
function runTests() {
  let command = `newman run tests/collections/${options.collection}.json -e tests/environments/${options .environment}.json -d tests/data/${options .data}.csv -r cli`;
  console.log("Server Started. Executing tests...");
  exec(command, (err, stdout) => {
    if (err) {
      console.error(`Err on test execution: ${stdout}`);
      process.exit(1);
    }
    console.log(stdout);
    process.exit(0);
  });
}

function startLocalServer() {
  exec('npm run start', (err, stdout) => {
    if (err) {
      console.error(`Err on server start: ${stdout}`);
      process.exit(1);
    }
    console.log(stdout);
  });
}

checkServerStatus();