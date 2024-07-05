import React from 'react'

const NewsItem = (props) => {

    const {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
          <div className="card">
          <span className="position-absolute top-0 translate-middle badge bg-danger" style={{zIndex: '1', left: '80%'}}>{source}</span>
              <img src={imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author ? 'Unknown' : author} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} target = "_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
              </div>
        </div>
      </div>
    )
  }


export default NewsItem
