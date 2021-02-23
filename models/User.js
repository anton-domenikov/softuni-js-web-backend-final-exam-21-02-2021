const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expense',
    }]
});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', userSchema);