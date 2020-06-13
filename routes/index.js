var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Article = require('../models/article');

router.get('/', async (req,res)=>{
    var articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('index', { articles: articles })
});
router.get('/about', async (req,res)=>{
    res.render('about')
});
module.exports = router;