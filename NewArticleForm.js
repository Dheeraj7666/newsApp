import React, { useState } from 'react';

function NewArticleForm({ setAuthor }) { // Corrected prop name
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    category: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      // Reset form data after successful submission
      setFormData({
        title: '',
        author: '',
        content: '',
        category: ''
      });

      alert("Article Added!");
      setAuthor(false); // Corrected function name

    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="form-container"> {/* Centered container */}
      <h2>Add New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Article
        </button>
      </form>
    </div>
  );
}

export default NewArticleForm;
