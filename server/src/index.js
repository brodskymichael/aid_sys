//import usersRouters from './routes/users'
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()
import http from 'http';
import  router  from './routes/rutas.js';
import { dbConn } from './db.js';
import cors from "cors";
import bodyParser from "body-parser";
import cookies from 'cookie-parser';
//import { verifyJWT } from './middleware/verifyJWT.js';
import { Server } from "socket.io";
import { postMessage } from './controllers/message.js';
import { sendQuestion, changeMood } from './controllers/user.js';
import * as cron from 'node-cron';
import { reset, calculoDistress } from './controllers/cron.js';
import Settings from './models/settings.js';

const app = express();

const server = http.createServer(app);
app.use(cookies())
app.use(cors({ origin:  '*'}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header('Origin'));
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookies());


const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
}
});

socketIO.on('connection', (socket) => {
  //console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("newMessage", (message) => {
    //console.log(message);
    postMessage({body:message})
    socketIO.sockets.emit("sendMessage", message);
  });

  //socket.on('disconnect', () => {
    //console.log('🔥: A user disconnected');
  //});
  
  socket.on("askMood", (user) => {
 
    sendQuestion({body:user})
    socketIO.sockets.emit("changeMood", user);
  });
  
  socket.on("updateMood", (mood) => {
    changeMood({body:mood})
    socketIO.sockets.emit("RTAchangeMood", mood);
   
  });

  socket.on("newLog",()=>{
    setTimeout(()=>{socketIO.sockets.emit("RTAlog");}, 1000);
  })
  

});

app.get('/', function(req, res){
    res.send('hello world')
})
server.listen(9000, ()=>{
    console.log('express server start');
});


dbConn();
app.use('/',router);

cron.schedule("0 46 20 * * * ", function () {
  console.log("------ reset ---------");
  reset();
},{
  timezone: "America/Buenos_Aires"
});
let settings = await Settings.findOne()
let sc = settings.sampling_cycle;

cron.schedule("0 */"+sc+" 7-20 * * * ", function () {
  console.log("------ calculando distress ---------");
  calculoDistress();
  setTimeout(()=>{socketIO.sockets.emit("checkDistress");}, 1000);
  
},{
  timezone: "America/Buenos_Aires"
});



