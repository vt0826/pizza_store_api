// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');

//Instantiate the server module object
var server = {};

//instantitate the HTTP server
server.httpServer = http.createServer(function(req, res) {
  server.unifiedServer(req, res);
});

//Instatitate the HTTPs server
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem')),
};

server.httpsServer = https.createServer(server.httpsServerOptions, function(
  req,
  res,
) {
  server.unifiedServer(req, res);
});

//function for parsing url. All the server logic for both http and https server
server.unifiedServer = function(req, res) {
  res.setHeader(
    'Access-Control-Allow-Methods',
    ' POST, GET, OPTIONS, DELETE, PUT',
  );

  // get the url and parse it
  var parsedUrl = url.parse(req.url, true);
  //get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //get the query string as an object
  var queryStringObject = parsedUrl.query;
  //get the HTTP method
  var method = req.method.toLowerCase();

  if (req.method === 'OPTIONS') {
    //  res.writeHead(200);
  }
  //get the headers as an object
  var headers = req.headers;

  //get payload is any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();

    //chose the req hanlder and send to notfound handler if its undefined
    var chosenHandler =
      typeof server.router[trimmedPath] !== 'undefined'
        ? server.router[trimmedPath]
        : handlers.notFound;

    //If the request is within the public directroy, use the public handler
    chosenHandler =
      trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

    //construct the data object to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    console.log(data.method);
    console.log(data.payload);
    // Route the req to the corresponding handler
    chosenHandler(data, function(statusCode, payload, contentType) {
      //Determin the type of response (fallback to JSON)
      contentType = typeof contentType == 'string' ? contentType : 'json';

      //use the status code called back by the hadnler, or default to 200
      statusCode = typeof statusCode == 'number' ? statusCode : 200;
      // return the response part that are content-specific
      var payloadString = '';
      if (contentType == 'json') {
        res.setHeader('Content-Type', 'application/json');
        //use the payload called back by the handler, or default to an empty object
        payload = typeof payload == 'object' ? payload : {};
        //convert payload to string
        var payloadString = JSON.stringify(payload);
      }
      if (contentType == 'html') {
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof payload == 'string' ? payload : '';
      }
      if (contentType == 'favicon') {
        res.setHeader('Content-Type', 'image/x-icon');
        payloadString = typeof payload !== 'undefined' ? payload : '';
      }
      if (contentType == 'css') {
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof payload !== 'undefined' ? payload : '';
      }
      if (contentType == 'png') {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        payloadString = typeof payload !== 'undefined' ? payload : '';
      }
      if (contentType == 'jpg') {
        res.setHeader('Content-Type', 'image/jpeg');
        payloadString = typeof payload !== 'undefined' ? payload : '';
      }
      if (contentType == 'plain') {
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof payload !== 'undefined' ? payload : '';
      }

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS',
      );
      res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header');
      res.setHeader('Access-Control-Max-Age', '86400');
      //res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept',
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        ' POST, GET, OPTIONS, DELETE, PUT',
      );
      res.setHeader('Content-Type', 'application/json; charset=UTF-8');
      res.setHeader('Access-Control-Expose-Headers', '*');
      //if (req.getMethod().equals("OPTIONS")) {
      //HttpUtil.setResponse(res, HttpStatus.OK.value(), null);
      // res.writeHead(200);
      //    return;
      // }
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
      } else {
        res.writeHead(statusCode);
      }
      res.end(payloadString);

      //if the response is 200 print green, otherwise print red
      if (statusCode == 200) {
        debug(
          '\x1b[32m%s\x1b[0m',
          method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode,
        );
      } else {
        debug(
          '\x1b[35m%s\x1b[0m',
          method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode,
        );
      }
    });
  });
};

//server router
server.router = {
  '': handlers.index,
  'account/create': handlers.accountCreate,
  'account/edit': handlers.accountEdit,
  'account/deleted': handlers.accountDeleted,
  'session/create': handlers.sessionCreate,
  'session/deleted': handlers.sessionDeleted,
  'invoices/create': handlers.invoicesCreate,
  'menu/edit': handlers.menuEdit,
  'menu/delete': handlers.menuDeleted,
  ping: handlers.ping,
  'api/users': handlers.users,
  'api/checkusers': handlers.checkUsers,
  'api/tokens': handlers.tokens,
  'api/campaigns': handlers.campaigns,
  'api/campaign': handlers.campaign,
  'api/menu': handlers.menu,
  'api/invoices': handlers.invoices,
  'api/messages': handlers.messages,
  'favicon.ico': handlers.favicon,
  public: handlers.public,
};

//Init Script
server.init = function() {
  // start the HTTP server, and have it listen on port 3000
  server.httpServer.listen(config.httpPort, function() {
    console.log(
      '\x1b[36m%s\x1b[0m',
      'The server is listening on port ' + config.httpPort,
    );
  });

  //start the HTTPS server
  server.httpsServer.listen(config.httpsPort, function() {
    console.log(
      '\x1b[35m%s\x1b[0m',
      'The server is listening on port ' + config.httpsPort,
    );
  });
};

//export the module
module.exports = server;
