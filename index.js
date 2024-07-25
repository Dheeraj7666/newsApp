import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newsApp_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Article Schema and Model
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: { type: String, unique: true },
  urlToImage: String
});

const Article = mongoose.model('Article', articleSchema);

// Routes
app.post('/api/saveArticle', async (req, res) => {
  try {
    const { title, description, url, urlToImage } = req.body;
    const newArticle = new Article({ title, description, url, urlToImage });
    await newArticle.save();
    res.status(200).json({ message: 'Article saved successfully', article: newArticle });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ message: 'Failed to save the article' });
  }
});

app.delete('/api/deleteArticle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Failed to delete the article' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
