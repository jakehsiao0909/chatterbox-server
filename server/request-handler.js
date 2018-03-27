var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var results = [];

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  const { method, url } = request;
  console.log('Serving request type ' + method + ' for url ' + url);
  if (url !== '/classes/messages') {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end('error');
  } else if ( method === 'GET') {
    if (results.length > 0) {
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(JSON.stringify({results}));
  } else if ( method === 'POST') {
    var messages = '';
    request.on('data', function(chunk) {
      messages += chunk;
    
    });
    request.on('end', function() {
      if (messages) {
        results.push(JSON.parse(messages));
        response.writeHead(201, {"Content-Type": "text/plain"});
        response.end('okay');
      }
    });
  }
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
