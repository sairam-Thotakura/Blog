const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
    });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});

app.get('/newpost', (req, res) => {
    res.render('newpost');
});

app.post('/newpost', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
