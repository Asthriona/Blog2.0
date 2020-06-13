var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var config = require('./config.json')
var session = require('express-session');
var DiscordStrategies = require('./strategies/discordstrategies');
var MongoStore = require('connect-mongo')(session);
Article = require('./models/article')
var app = express();

//router
var articleRoute = require('./routes/article');
var indexRoute = require('./routes/index');
var backRoute = require('./routes/back');
var authRouter = require('./routes/auth');


//middleware
app.use(session({
    secret: config.secret,
    cookie: {
      maxAge: 60000 * 60 * 72
    },
    saveUninitialized: false,
    name: 'Yukiko_Yummy_cookie',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

mongoose.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Connected to Kurisu database."));

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('x-powered-by', 'AshquiRenee Blog');
app.use(methodOverride('_method'))
app.use('/', indexRoute);
app.use('/articles', articleRoute);
app.use('/back', backRoute);
app.use('/auth', authRouter);

app.listen(config.port, console.log(`Asthriona's blog is now running on http://localhost:${config.port}`));