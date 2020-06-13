var mongoose = require('mongoose');

var DiscordShchema = new mongoose.Schema({
    did: { type: String, required: true },
    username: { type: String, required: true },
    tag: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: false },
    guilds: { type: Array, required: true },
    premium: { type: String, required: false },
    local: { type: String, required: true },
    flags: { type: String, required: true },
    sitePremium: { type: String, required: false }
});

var Discord = module.exports = mongoose.model('Site', DiscordShchema);