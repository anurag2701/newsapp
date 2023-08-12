import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card text-center" style={{ width: "18rem" }}>
          <img
            src={imgUrl || "https://www.epss.ucla.edu/static/images/default-news.png"}
            className="card-img-top"
            style={{ height: "175px" }}
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning">
                {source}
                <span class="visually-hidden">unread messages</span>
              </span>
            </h5>

            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ?? "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

NewsItem.defaultProps = {
  imgUrl: "https://www.epss.ucla.edu/static/images/default-news.png",
};
