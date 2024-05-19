const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Sync database
Post.sync();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Create a post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.json(post);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
