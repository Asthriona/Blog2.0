var express = require('express');
var createError = require('create-error');
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
//app.use(helmet())
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
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log("Connected to Kurisu database."));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('x-powered-by', 'AshquiRenee WS');
app.use(methodOverride('_method'))
if (config.maintenance == true) {
  app.get('*', (req, res) => {
    res.render('maintenance')
  });
} else {
  app.use('/', indexRoute);
  app.use('/articles', articleRoute);
  app.use('/back', backRoute);
  app.use('/auth', authRouter);
}

app.listen(config.port, console.log(`Asthriona's blog is now running on http://localhost:${config.port}`));