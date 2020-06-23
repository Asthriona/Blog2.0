var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var title = 'Asthriona - Blog'

var Article = require('../models/article');

router.get('/', async (req,res)=>{
    var articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('index', { articles: articles, title: title })
});
router.get('/about', async (req,res)=>{
    res.render('about', {
        title: title
    })
});
router.get('/nope', async (req,res)=>{
    res.render('back/nope', {
        username: req.user.username,
        avatar: `https://cdn.discordapp.com/avatars/${req.user.did}/${req.user.avatar}?size=2048`,
        title: title
    })
});
module.exports = router;