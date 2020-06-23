var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Article = require('../models/article');
const article = require('../models/article');


router.get('/', function (req,res){
    res.render('index');
});
router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect(('/'));
    res.render('articles/show', {article: article, title: "Asthriona - "+ article.title });
});
async function saveArticleAndRedirect(path){
    return async (req,res)=>{
        let article = req.article
            article.title = req.body.title,
            article.description = req.body.description,
            article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/back/${article.slug}`)
        }catch(e){
            res.render(`articles/${path}`, {article: article})
        }
    }
}
module.exports = router;
