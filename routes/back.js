var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Article = require('../models/article');
function isAuthorise(req, res, next) {
    if (req.user) {
        if (req.user.sitePremium != "1") res.redirect('/nope')
        console.log(`User ${req.user.username} is logged in (${req.user.email})/${req.user.did}`);
        next();
    } else {
        res.redirect('/auth');
    }
}

router.get('/', isAuthorise, async (req,res)=>{
    var articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('back/index', {
        username: req.user.username,
        avatar: `https://cdn.discordapp.com/avatars/${req.user.did}/${req.user.avatar}?size=2048`,
        articles: articles,
        title: "Asthriona - Admin panel"
    })
});
router.get('/new', isAuthorise, (req,res)=>{
    res.render('articles/new', {article: new Article(), title: "Asthriona - New Post"})
});
router.get('/edit/:id', isAuthorise, async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {
        article: article,
        username: req.user.username,
        avatar: `https://cdn.discordapp.com/avatars/${req.user.did}/${req.user.avatar}?size=2048`,
        title: "Asthriona - Edit " + title
    })
});
router.post('/', isAuthorise, async (req,res)=>{
   let article = new Article({
       title: req.body.title,
       description: req.body.description,
       markdown: req.body.markdown,
       img: req.body.img,
   });
   try{
       article = await article.save()
       res.redirect(`articles/${article.slug}`)
   } catch(e){
       console.log(e)
    res.render('articles/new', {article: article})
   }
});
router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete({_id: req.params.id});
    res.redirect('/back');
});
async function saveArticleAndRedirect(path){
    return async (req,res)=>{
        let article = req.article
            article.title = req.body.title,
            article.description = req.body.description,
            article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e){
            res.render(`back/${path}`, {article: article})
        }
    }
}

module.exports = router;