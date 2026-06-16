// Simple proxy server for pivotalstacks.com
// Run: node proxy.js

const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Handle WebSocket upgrades for HMR
  if (req.headers['upgrade'] === 'websocket') {
    proxy.ws(req, res, { target: 'http://192.168.141.94:8200' });
    return;
  }
  proxy.web(req, res, { target: 'http://192.168.141.94:8200' });
});

server.listen(80, '0.0.0.0', () => {
  console.log('Proxy server running on http://pivotalstacks.com:80');
  console.log('-> Forwarding to http://192.168.141.94:8200');
});

// Handle WebSocket proxying
server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'http://192.168.141.94:8200' });
});
