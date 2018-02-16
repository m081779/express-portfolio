const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const logger     = require('morgan')
const app        = express();

//setting up morgan middleware
app.use(logger('dev'));

//setting up handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//setting up body parser middleware to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setting up static directory
app.use(express.static(path.join(__dirname, 'public')));

//bringing in router
const index = require('./routes/index');
const email = require('./routes/email');
app.use('/', index);
app.use('/email', email);


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`The magic is happening on localhost:${PORT}...`)
});
