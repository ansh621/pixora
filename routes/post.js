// postModel.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Define your Post schema fields here
  title: String,
  description: String,
  image: String,
  id: String,
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
