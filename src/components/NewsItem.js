import React from 'react'

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card text-center" style={{ width: "22rem" }}>
          <img
            src={imgUrl || "https://www.epss.ucla.edu/static/images/default-news.png"}
            className="card-img-top"
            alt=""
            style={{ height: "16rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning">
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            </h5>

            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ?? "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem

NewsItem.defaultProps = {
  imgUrl: "https://www.epss.ucla.edu/static/images/default-news.png",
};
