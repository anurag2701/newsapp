import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 20
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  // Constructor
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
 

  // componentDidMount runs After render.
  async componentDidMount() {
    await this.fetchNews(this.state.page);
  }

  handleNextClick = () => {
    this.setState({
      page: ++this.state.page,
      loading: true,
    });
    this.fetchNews();
  };
  handlePrevClick = () => {
    this.setState({
      page: --this.state.page,
      loading: true,
    });
    this.fetchNews();
  };

  fetchNews = async (page = this.state.page) => {
    let apiKey = process.env.REACT_APP_NEWS_API_KEY
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}${this.props.q? '&q=' + this.props.q : ''}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '40px 0px'}}>NewsBar - Top Headlines</h1>

        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {this.state.articles.map((article) => {
              
              return (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title !== null ? article.title.slice(0, 40) : ""}
                    description={article.description !== null ? article.description.slice(0, 80) : ""}
                    imgUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* counter button */}
        <div className="container mt-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>

          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
