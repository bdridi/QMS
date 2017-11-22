//===========================
// GET required modules 
//===========================
var express =  require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require("./config/config");
var path = require("path");
var api = require("./routes/routes");
var qms = require("./data/data");



//==========================
// server configuration
//==========================

var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT || 8080;
//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan for log
app.use(morgan('dev'));

// socket.io 




app.get('/',function(req,res){
    
    //res.json({succes : true, message : 'welcome to index'}); 
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


app.use('/api/',api);

var server = require('http').createServer(app);  
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('a user connected');
});

app.io = io;

server.listen(port,function(){
  qms.init();
  
});

