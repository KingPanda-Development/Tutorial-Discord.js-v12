const express = require('express');
const server = express();

server.use('/', (req, res)=>{
  res.send('Warrior-Panda Now already online.')
})
function keepAlive(){
  server.listen(5555, ()=>{console.log("Server is ready!")
  });
}
module.exports = keepAlive;
