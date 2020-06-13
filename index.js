var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var config = require('./config.json')
Article = require('./models/article')
var app = express();

//router
var articleRoute = require('./routes/article');
var indexRoute = require('./routes/index');
var backRoute = require('./routes/back');


//middleware
mongoose.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Connected to Kurisu database."));

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use('/', indexRoute);
app.use('/articles', articleRoute);
app.use('/articles', backRoute);

app.listen(config.port, console.log(`Asthriona's blog is now running on http://localhost:${config.port}`));