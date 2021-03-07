const express = require('express');
const server = express();

server.use('/', (req, res)=>{
  res.send('Tutorial-Bot-Discord is online.')
})
function keepAlive(){
  server.listen(3000, ()=>{console.log("Server is ready!")
  });
}
module.exports = keepAlive;
