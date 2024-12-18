const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ansh1044:ansh0621@learning.n1pvy.mongodb.net')

const plm = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profileImage: String,
    contact: Number,
    admin: {
        type: Boolean,
        default: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

// Plugin for passport-local-mongoose
userSchema.plugin(plm);

// Custom method to shuffle the posts array
userSchema.methods.shufflePosts = async function () {
    await this.populate('posts') 
    this.posts = this.posts.sort(() => Math.random() - 0.5); // Shuffle the posts array
};

module.exports = mongoose.model('User', userSchema);