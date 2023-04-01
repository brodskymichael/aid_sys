//import usersRouters from './routes/users'
import express from 'express';
import http from 'http';
import  router  from './routes/rutas.js';
import { dbConn } from './db.js';

const app = express();

const server = http.createServer(app);



app.get('/', function(req, res){
    res.send('hello world')
})
server.listen(9000, ()=>{
    console.log('express server start');
});

app.use('/',router);

dbConn();