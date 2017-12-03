const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const email = require('./routes/email');
const index = require('./routes/index');

app.use('/email', email);
app.use('/', index);

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/email', function(req, res) {
  message = req.body;
  if (message) {
    mail();
  }
  else {
    console.log('no mail.');
  }
  res.status(200).end();
});

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
      from: `"${message.name}" <marcoprincipio@hotmail.com>`,
      to: 'marcoprincipio@hotmail.com', 
      subject: 'New contact from your portfolio site!',
      text: `From: ${message.name} email: ${message.email} Phone Number: ${message.number} message: ${message.text}`,
      html: `<b>From: ${message.name}<br> <b>email: ${message.email}<br> <b>Phone Number: ${message.number}<br> <b>message: ${message.text}`
  }
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
