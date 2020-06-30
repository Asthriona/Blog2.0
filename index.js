var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var config = require('./config.json');
var session = require('express-session');
var DiscordStrategies = require('./strategies/discordstrategies');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
Article = require('./models/article');
var app = express();

//router
var articleRoute = require('./routes/article');
var indexRoute = require('./routes/index');
var backRoute = require('./routes/back');
var authRouter = require('./routes/auth');


//middleware
app.use(helmet())
app.use(session({
    secret: config.secret,
    cookie: {
      maxAge: 60000 * 60 * 72
    },
    saveUninitialized: false,
    name: "Asthriona's Yummy cookie",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

mongoose.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Connected to Kurisu database."));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('x-powered-by', 'AshquiRenee WS');
app.use(methodOverride('_method'))
app.use('/', indexRoute);
app.use('/articles', articleRoute);
app.use('/back', backRoute);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, console.log(`Asthriona's blog is now running on http://localhost:${config.port}`));