import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 20,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    console.log(this.props);
    document.title = `${this.capitalizeFirstLetter(this.props.q ?? this.props.category)} - News Bar`;
  }

  // componentDidMount runs After render.
  async componentDidMount() {
    await this.fetchNews(this.state.page);
  }

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // handleNextClick = () => {
  //   this.setState({
  //     page: ++this.state.page,
  //     loading: true,
  //   });
  //   this.fetchNews();
  // };
  // handlePrevClick = () => {
  //   this.setState({
  //     page: --this.state.page,
  //     loading: true,
  //   });
  //   this.fetchNews();
  // };

  fetchNews = async (page = this.state.page) => {
    this.props.setProgress(15)
    let apiKey = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}${this.props.q ? "&q=" + this.props.q : ""}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100)
  };

  fetchMoreData = async () => {
    this.setState({
      page: ++this.state.page,
    });
    await this.fetchNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          NewsBar - Top Headlines from {`${this.capitalizeFirstLetter(this.props.category)}`}
        </h1>
        {/* Infinite scroll code */}
        {this.state.loading ? (
          <Spinner />
        ) : (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
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
            </div>
          </InfiniteScroll>
        )}

        {/* non infinite scroll code */}
        {/* {this.state.loading ? (
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
*/}
        {/* counter button */}
        {/* <div className="container mt-3 d-flex justify-content-between">
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
        </div> */}
      </div>
    );
  }
}

export default News;
