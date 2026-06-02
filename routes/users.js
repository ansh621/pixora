const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

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