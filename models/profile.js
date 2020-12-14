const mongoose = require('mongoose');

const ProfileShchema = new mongoose.Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    desc: { type: String, required: true },
    twitter: { type: String, required: true },
    github: { type: String, required: true },
    website: { type: String, required: true },
    instagram: { type: String, required: true }
});

module.exports = mongoose.model('profile', ProfileShchema);