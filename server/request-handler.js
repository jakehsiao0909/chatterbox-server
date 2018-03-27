var defaultCorsHeaders = {
  'access-control-allow-origin': 'http://127.0.0.1:3000',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 60000,
  'access-control-allow-credentials': false
};
var results = [];
var currentId = 1;

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  const { method, url } = request;
  console.log('Serving request type ' + method + ' for url ' + url);
  if (url !== '/classes/messages') {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end('error');
  } else if ( method === 'OPTIONS' ) {
    response.writeHead(200, defaultCorsHeaders);
    response.end(JSON.stringify(currentOptions));
  } else if ( method === 'GET') {
    if (results.length > 0) {
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    console.log('' + JSON.stringify({results}));
    response.end(JSON.stringify({results}));
  } else if ( method === 'POST') {
    var message = '';
    request.on('data', function(chunk) {
      message += chunk;
      console.log(chunk);
    });
    request.on('end', function() {
      if (message) {
        messageObj = JSON.parse(message);
        messageObj.objectId = currentId++;
        messageObj.createdAt = new Date();
        results.push(messageObj);
        response.writeHead(201, {"Content-Type": "text/plain"});
        response.end('okay');
      }
    });
  } 
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;