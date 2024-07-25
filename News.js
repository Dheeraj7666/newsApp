import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './App.css';
import Spinner from './components/Spinner';

const NewsItem = ({ article, handleSaveClick, handleDeleteClick }) => {
  const { _id, title, description, url, urlToImage } = article;
  
  return (
    <div className="col-md-4 mb-3">
      <div className="card card-fixed-size">
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 65) : ""}...</h5>
          <p className="card-text">{description ? description.slice(0, 88) : ""}...</p>
          <div className="d-flex justify-content-between">
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read more</a>
            <button
              onClick={() => handleSaveClick(article)}
              className="btn btn-sm btn-secondary mx-2"
              style={{ width: "100px" }}
            >
              Save
            </button>
            <button
              onClick={() => handleDeleteClick(_id)}
              className="btn btn-sm btn-danger"
              style={{ width: "100px" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  article: PropTypes.object.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

const News = ({ country, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    fetchArticles(true);
  }, [country, category]);

  useEffect(() => {
    if (page === 1) return;
    fetchArticles();
  }, [page]);

  const fetchArticles = async (reset = false) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=20&category=${category}&apiKey=f74a1c17c82c4ba8a8badd0a8a3d27e9`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.articles)) {
        const newArticles = data.articles.filter(
          article => !articles.some(existingArticle => existingArticle.url === article.url)
        );

        setArticles(prevArticles => reset ? newArticles : [...prevArticles, ...newArticles]);
        setTotalResults(data.totalResults);
      } else {
        console.error("Expected data.articles to be an array but got:", data.articles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = async (article) => {
    try {
      const response = await axios.post('http://localhost:5000/api/saveArticle', {
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
      });

      if (response.status === 200) {
        console.log("Article saved successfully");
        const savedArticle = response.data.article;
        setArticles(prevArticles => prevArticles.map(a => a.url === article.url ? savedArticle : a));
      } else {
        console.error("Failed to save the article");
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteArticle/${id}`);

      if (response.status === 200) {
        console.log("Article deleted successfully");
        setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
      } else {
        console.error("Failed to delete the article");
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center'>Top Headlines - AajTak</h1>
      {loading && <Spinner />}
      <div className='row'>
        {articles.length > 0 ? (
          articles.map((element, index) => {
            if (!element.urlToImage) {
              return null;
            }

            return (
              <NewsItem
                key={`${element.url}-${index}`}
                article={element}
                handleSaveClick={handleSaveClick}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })
        ) : (
          !loading && <p>No articles available.</p>
        )}
      </div>
      {articles.length < totalResults && !loading && (
        <button className="btn btn-primary" onClick={() => setPage(prevPage => prevPage + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;

