var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var config = require('./config.json')
Article = require('./models/article')
var app = express();

//router
var articleRoute = require('./routes/article');


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
app.use('/articles', articleRoute);

app.get('/', async (req,res)=>{
    var articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('index', { articles: articles })
})
app.get('/about', async (req,res)=>{
    res.render('about')
})

app.listen(3000);