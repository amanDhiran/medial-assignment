import express from "express";
import generateOgImage from "./src/generateOgImage.js"
import cors from "cors"
import { v4 } from "uuid";
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static('public'));

const posts = {}

app.post('/api/create-post', async (req, res) => {
    const { title, content, image } = req.body;
    const postId = v4();

    posts[postId] = { title, content, image };

    if (title && content) {
        try {
            await generateOgImage( {title, content, imageUrl: image }, postId ); 
            posts[postId].ogImage = `${process.env.BACKEND_URL}/${postId}.png`;
          } catch (error) {
            console.error('Error generating OG image:', error);
            res.status(500).json({ message: 'Failed to generate OG image' });
          }
    }

    res.json({ 
        postUrl: `${process.env.FRONTEND_URL}/post/${postId}`,
        ogImage: `${process.env.BACKEND_URL}/${postId}.png`
     });
});

app.get('/api/post/:postId', (req, res) => {
    const { postId } = req.params;
    const post = posts[postId];
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));

