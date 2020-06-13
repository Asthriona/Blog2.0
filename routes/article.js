var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Article = require('../models/article');


router.get('/', function (req,res){
    res.render('index');
});
router.get('/new', (req,res)=>{
    res.render('articles/new', {article: new Article()})
});
router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
});
router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect(('/'));
    res.render('articles/show', {article: article});
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
router.put('/:id', async (req,res)=>{
    let article = await Article.findById({id: req.params.id},
    (err, article)=>{
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown,
        article.img = req.body.img
    });
    try{
        article = await article.save()
        res.redirect(`/${article.slug}`)
    } catch(e){
        console.log(e)
     res.render(`articles/edit/${id}`, {article: article})
    }
 });
router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete({id: req.params.id});
    res.redirect('/', {article: article});
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
