var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/back'
}), (req,res)=>{
    res.send(req.user);
});
router.get('/logout', (req,res) =>{
    if(req.user){
        req.logout();
        res.redirect('/');
    }else{
        res.redirect('/');
    }
});
module.exports = router;