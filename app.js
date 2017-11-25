var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var index = require('./routes/index');
var users = require('./routes/users');
// var email = require('./routes/email');
let message = {};

var app = express();
var PORT = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/email', function(req, res) {
  message = req.body;
  if (req.body) {
    mail();
  }
  else {
    console.log('no mail.');
  }
});
app.use('/', index);
app.use('/users', users);
// app.use('/email', email);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function mail() {
  let transporter = nodemailer.createTransport({
      host: 'smtp.live.com',
      port: 587,
      secure: false,
      auth: {
          user: 'marcoprincipio@hotmail.com',
          pass: '!map4921'
      }
  });

  let mailOptions = {
      from: '"'+message.name+'" <marcoprincipio@hotmail.com>',
      to: 'marcoprincipio@hotmail.com', 
      subject: 'New contact from your portfolio site!',
      text: 'From: '+ message.name+ 'email' +message.email+'message'+ message.message,
      html: '<b>From: ' + message.name + '<br>email: ' + message.email + '<br>Phone Number: ' + message.number + '<br>message: '+ message.message+'</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
  });
}

app.listen(PORT, function () {
	console.log('listening on http://localhost:'+PORT)
});
module.exports = app;