let baseUrl = window.location.protocol + '//' + (process.env.REACT_APP_GATEWAY_HOST || window.location.hostname);
let port;
switch (window.location.protocol) {
  case 'http:':
    port = process.env.REACT_APP_GATEWAY_HTTP_PORT || window.location.port;
    if (port !== 80) {
      baseUrl += ":" + port;
    }
    break;
  case 'https:':
    port = process.env.REACT_APP_GATEWAY_HTTPS_PORT || window.location.port;
    if (port !== 443) {
      baseUrl += ":" + port;
    }
    break;
}

export const apiUrl = baseUrl + '/api';
