import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './News';
import NewArticleForm from './components/NewArticleForm'; // Fixed import

const App = () => {
  const [isAuther, setAuther] = useState(false);

  return (
    <Router>
      <div>
        <NavBar isAuther={isAuther} setAuther={setAuther} />
        <Routes>
          <Route path="/" element={<News key="general" country="us" category="general" />} />
          <Route path="/business" element={<News key="business" country="us" category="business" />} />
          <Route path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" />} />
          <Route path="/general" element={<News key="general" country="us" category="general" />} />
          <Route path="/health" element={<News key="health" country="us" category="health" />} />
          <Route path="/science" element={<News key="science" country="us" category="science" />} />
          <Route path="/sports" element={<News key="sports" country="us" category="sports" />} />
          <Route path="/technology" element={<News key="technology" country="us" category="technology" />} />
        </Routes>
        {/* Conditionally render NewArticleForm based on isAuther */}
        {isAuther && <NewArticleForm setAuther={setAuther} />}
      </div>
    </Router>
  );
};

export default App;
