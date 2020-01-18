import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import dirs from './config/directory';

import {sendSckt, addScktListener} from './sckt';

var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*'});

// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack/webpack.config.dev';
import sckt from './sckt';

// if (process.env.NODE_ENV === 'development') {
//     const compiler = webpack(webpackConfig);
//     app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
//     app.use(webpackHotMiddleware(compiler));
// }

// app.get('/', (req, res) => res.send('Hello World I am heree!'))

// Router
// app.use('/api', routes);

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(dirs.assetsDir, 'index.html'));
});

app.get('/apic', (req, res) => {
  res.send('a');
});

app.post('/data', (req, res) => {
  console.log(req.body);
});

server.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});
// WARNING: app.listen(80) will NOT work here!

let userClrs = {};



io.on('connection', function (socket) {

  socket.emit('initClrs', {userClrs});
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    // console.log(data);
  });

  socket.on('btnclick', function (data) {
      userClrs[data.name] = data.clr ;
      console.log(userClrs);  

      if(data.name =='pankaj'){
        sendSckt('o');
      }else{
        sendSckt('c');
      }

      io.emit('btnclick',  { server: 1, ...data });

    });

  socket.on('checkstatus', function (data) {
    console.log(data);  
    sendSckt(data.s);
  });
  
  addScktListener(function(msg, info){
    io.emit('statusnew', {
      val : msg.toString(),
      info
    });
  });

});

var ip = require("ip");
var a = ip.address();
console.log("private ip address", a);


export default app;
