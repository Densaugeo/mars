process.title = 'Airship';

var http    = require('http');
var repl    = require('repl');
var fs      = require('fs');
var express = require('express');
var ws      = require('ws');
var stdio   = require('stdio');
var iz      = require('iz');

/////////////////
// Get options //
/////////////////

var optionsCLI = stdio.getopt({
  'ip'    : {key: 'i', args: 1, description: 'IP address for both HTTP and WS servers. Defaults to OpenShift if available, or if not then 0.0.0.0'},
  'port'  : {key: 'p', args: 1, description: 'TCP port for both HTTP and WS servers. Defaults to OpenShift if available, or if not then 8080'},
  'config': {key: 'c', args: 1, description: 'Load settings from configurations file. Defaults to ./config.json'},
  'nofile': {          args: 0, description: 'Run without a config file. "ip" and "port" options must be specified'}
});

try {
  var optionsFile = JSON.parse(fs.readFileSync(optionsCLI.config || 'config.json'));
}
catch(error) {
  console.error('Warning: Unable to read config file "' + (optionsCLI.config || 'config.json') + '". (' + error + '). Options not specified by argument will fall back to hard-coded defaults');
  var optionsFile = {}
}

var optionsDefault = {
  ip    : '0.0.0.0',
  port  : 8080,
  config: null,
  nofile: true
};

// Condense options sources into one options object, applying priority
var options = {};

for(var i in optionsDefault) {
  options[i] = optionsCLI[i] || optionsFile[i] || optionsDefault[i];
}

if(!iz(options.ip).ip().valid) {
  if(iz(process.env[options.ip]).required().ip().valid) {
    options.ip = process.env[options.ip];
  }
  else {
    console.error('Error: IP must be a valid IP address or local url');
    process.exit(1);
  }
}

if(!iz(options.port).int().between(1, 65535).valid) {
  if(iz(process.env[options.port]).required().int().between(1, 65535).valid) {
    options.port = process.env[options.port];
  }
  else {
    console.error('Error: TCP port must be an integer between 1 and 65535');
    process.exit(1);
  }
}

if(iz(options.port).int().between(1, 1024).valid) {
  console.warn('Warning: TCP ports between 1 and 1024 may require root permission');
}

/////////////////
// HTTP server //
/////////////////

var app = express();
var httpServer = http.createServer(app);
httpServer.listen(options.port, options.ip);

// Simple static page server
app.use('/', express.static('./http'));
app.use(express.compress());
console.log(new Date().toUTCString() + ': Static file server listening at http://' + options.ip + ':' + options.port + '/');

///////////////
// WS server //
///////////////

/////////
// CLI //
/////////

if(repl != null) { // REPL may not be available on some cloud hosts
  var cli = repl.start({});
  cli.context.http           = http;
  cli.context.repl           = repl;
  cli.context.fs             = fs;
  cli.context.express        = express;
  cli.context.ws             = ws;
  cli.context.stdio          = stdio;
  cli.context.iz             = iz;
  cli.context.optionsCLI     = optionsCLI;
  cli.context.optionsFile    = optionsFile;
  cli.context.optionsDefault = optionsDefault;
  cli.context.options        = options;
  cli.context.app            = app;
  cli.context.httpServer     = httpServer;
  cli.context.wsServer       = wsServer;
}
