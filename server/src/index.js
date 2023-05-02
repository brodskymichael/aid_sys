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

app.get('/', function(req, res){
    res.send('hello world')
})
server.listen(9000, ()=>{
    console.log('express server start');
});


dbConn();
app.use('/',router);

