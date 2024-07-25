import React, { Component } from 'react';
import '../App.css';


export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props;
        return (
            <div>
                <div className="card card-fixed-size">
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <div className="d-flex justify-content-between">
                            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read more</a>
                            <button className="btn btn-sm btn-secondary mx-2" style={{ width: "100px" }}>ve</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;


// import React from 'react';
// import axios from 'axios';
// import '../App.css';

// const NewsItem = ({ title, description, imgUrl, newsUrl }) => {
//   const handleSave = async () => {
//     console.log('hello wellcome')
//     alert('hello')
//     // const article = { title, description, imgUrl, newsUrl };

//     // try {
//     //   const response = await axios.post('http://localhost:3000/api/articles', article);
//     //   console.log('Article saved:', response.data);
//     // } catch (error) {
//     //   console.error('Error saving article:', error);
//     // }
//   };

//   return (
//     <div>
//       <div className="card card-fixed-size">
//         <img src={imgUrl} className="card-img-top" alt="..." />
//         <div className="card-body">
//           <h5 className="card-title">{title}...</h5>
//           <p className="card-text">{description}...</p>
//           <div className="d-flex justify-content-between">
//             <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read more</a>
//             <button onClick={()=>handleSave()} className="btn btn-sm btn-secondary mx-2" style={{ width: "100px" }}>ve</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewsItem;



