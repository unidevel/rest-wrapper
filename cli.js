#!/usr/bin/env node
'use strict';

const DEFAULT_PORT = 3000;
var argv = [].concat.call(process.argv, []);
var port = DEFAULT_PORT;
var portFlag = argv.indexOf('--port');
if ( portFlag < 0 ) portFlag = argv.indexOf('-p');
if ( portFlag >= 0 ) {
  port = parseInt(argv[portFlag+1]) || DEFAULT_PORT;
  argv.splice(portFlag, 2);
}
var recursive = false;
var recursiveFlag = argv.indexOf('--recursive');
if ( recursiveFlag < 0 ) recursiveFlag = argv.indexOf('-r');
if ( recursiveFlag >= 0 ){
  argv.splice(recursiveFlag, 1);
  recursive = true;
}

var dir = '.';
if ( argv.length <= 2 ) {
  console.error('USAGE: rest-server [-p port] [-r] <rest dir>');
  process.exit(1);
}
else {
  dir = argv[argv.length-1];
}

var cwd = process.cwd()
var path = require('path');
dir = path.join(cwd, dir);

//console.log(process.argv, dir, recursive, port);
var restServer = require('./index');
var server = null;
server = restServer({
  docs: true,
  http: {
    max_requests: 10,
    cros: {
      domain: '*',
      credential: false
    }
  },
  port: port
});
server.route(dir);
