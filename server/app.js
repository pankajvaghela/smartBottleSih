import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import dirs from './config/directory';
const url = require('url');  

import {sendSckt, addScktListener} from './sckt';
var http = require('http')

var socketIO = require('socket.io'), server, io;
// var socketio = require('socket.io')(server, { origins: '*:*'});

// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack/webpack.config.dev';
import sckt from './sckt';
import { EVENTS } from './nodesManager';
import eventBus from './eventBus';
import Axios from 'axios';

// if (process.env.NODE_ENV === 'development') {
  //     const compiler = webpack(webpackConfig);
  //     app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
  //     app.use(webpackHotMiddleware(compiler));
  // }
  
  // app.get('/', (req, res) => res.send('Hello World I am heree!'))

  // Router
  // app.use('/api', routes);
  var ip = require("ip");
  var myIP = ip.address();
  
  var patient = [
    [
      ['01', '2111'],
      ['02', '2112'],
      ['03', '2113'],
      ['04', '2114'],
      ['05', '2115'],
      ['06', '2116'],
      ['07', '2117'],
      ['08', '2118'],
      ['09', '2119']
    ],

    [
      ['01', '2063'],
      ['02', '1254'],
      ['03', '5289'],
      ['04', '5487'],
      ['05', '5289'],
      ['06', '4785'],
      ['07', '5689'],
      ['08', '1248'],
      ['09', '5689'],
      ['10', '5232'],
      ['11', '4152'],
      ['12', '4785'],
    ],

    [
      ['01', '5414'],
      ['02', '4478'],
      ['03', '8747'],
      ['04', '4475'],
      ['05', '4478'],
      ['06', '5598'],
      ['07', '8895'],
      ['08', '5899'],
      ['09', '4578']
    ],

    [
      ['01', '5587'],
      ['02', '7866'],
      ['03', '5226'],
      ['04', '1245'],
      ['05', '2256'],
      ['06', '1255'],
      ['07', '3559'],
      ['08', '4558'],
      ['09', '7885']
    ],

    [
      ['01', '2115'],
      ['02', '2114'],
      ['03', '4587'],
      ['04', '1245'],
      ['05', '5565'],
      ['06', '4778'],
      ['07', '6558'],
      ['08', '4455'],
      ['09', '5698']
    ],

    [
      ['01', '4557'],
      ['02', '1223'],
      ['03', '1235'],
      ['04', '5621'],
      ['05', '4785'],
      ['06', '4455'],
      ['07', '4115'],
      ['08', '4512'],
      ['09', '4478']
    ],

    [
      ['01', '5895'],
      ['02', '7485'],
      ['03', '4784'],
      ['04', '5887'],
      ['05', '4455'],
      ['06', '2255'],
      ['07', '1145'],
      ['08', '4588'],
      ['09', '6598']
    ],

    [
      ['01', '5895'],
      ['02', '7485'],
      ['03', '4784'],
      ['04', '5887'],
      ['05', '4455'],
      ['06', '2255'],
      ['07', '1145'],
      ['08', '4588'],
      ['09', '6598']
    ],

    [
      ['01', '5895'],
      ['02', '7485'],
      ['03', '4784'],
      ['04', '5887'],
      ['05', '4455'],
      ['06', '2255'],
      ['07', '1145'],
      ['08', '4588'],
      ['09', '6598']
    ],


  ]


  app.use(function (req, res, next) {
    res.locals = {
      myIP: myIP,
    };
    next();
 });

// Landing page
app.get('/', (req, res) => {
  let wardId = 0;
  if(req.query.id) wardId = req.query.id;

  res.render('contents/ward', {patient : patient[wardId], res});
  // res.render('contents/home' , {res});
  // res.sendFile(path.join(dirs.assetsDir, 'index2.html'));
});

app.get('/apic', (req, res) => {
  res.send('a');
});

app.get("/wardno\*", function(req, res){
  res.redirect(url.format({
    pathname:"/",
    query:req.query,
  }));


  // res.redirect('/');
  // res.redirect('/?ward='+res.query.id);
  // res.render('contents/ward', {patient : patient[req.query.id], res});
});

app.get('/hospital', (req, res) => {
  res.render('contents/hospital', {res});
});

app.get('/developer', (req, res) => {
  res.render('contents/developer', {res});
});

app.post('/data', (req, res) => {
  console.log(req.body);
});



var server = http.Server(app);

server.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
    
    try{
      Axios.post("https://sbsih.herokuapp.com/changehostip", {
        ip: myIP,
        port : app.get('port')
      });
    }
    catch(err){
      console.error("GG", err);
    }


});
// WARNING: app.listen(80) will NOT work here!

let userClrs = {};


io = socketIO(server);

addScktListener(function(msg, info){
  io.emit('statusnew', {
    val : msg.toString(),
    info
  });
});

io.on('connection', function (socket) {

  
  eventBus.on(EVENTS.NEWCONNECT, function (ip) {
    console.log('new node connnected', ip);
    io.emit('newconnect', {
      ip
    });    
  });
  
});





console.log("private ip address", myIP);


export default app;
