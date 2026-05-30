import http from 'node:http'

const PORT = 2000

const server = http.createServer((req, res)=>{
  res.end("Hello again! before I just made a mess!");
})

server.listen(PORT, ()=>{
  console.log(`Server is connected : ${PORT}`)
})