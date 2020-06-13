var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//var Article = require('../models/article');

router.get('/', (req,res)=>{
    res.render('back/index')
});
router.get('/new', (req,res)=>{
    res.render('articles/new', {article: new Article()})
});
router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('back/edit', {article: article})
});
router.post('/', async (req,res)=>{
   let article = new Article({
       title: req.body.title,
       description: req.body.description,
       markdown: req.body.markdown,
       img: req.body.img,
   });
   try{
       article = await article.save()
       res.redirect(`/${article.slug}`)
   } catch(e){
       console.log(e)
    res.render('back/new', {article: article})
   }
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
            res.render(`back/${path}`, {article: article})
        }
    }
}

module.exports = router;