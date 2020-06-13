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
router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect(('/'));
    res.render('articles/show', {article: article});
});

module.exports = router;