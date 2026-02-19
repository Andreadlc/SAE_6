const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 } // 0 pour utilisateur normal, 1 pour admin
});

module.exports = mongoose.model('User', userSchema);