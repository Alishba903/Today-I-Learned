import http from 'node:http';

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.end("Hello from Backend!");
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
