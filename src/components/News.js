import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  // Constructor
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 20
    };
  }

  // After render
  async componentDidMount() {
    await this.fetchNews(this.state.page)
  }

  
  handleNextClick = () => {
    this.setState({
        page: ++this.state.page
    })
    this.fetchNews()
  }
  handlePrevClick = () => {
    this.setState({
        page: --this.state.page
    })
    this.fetchNews()
  }

   fetchNews = async (page = this.state.page, pageSize = this.state.pageSize) => {
    console.log(page, pageSize)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=&apiKey=09ebc7c3a87c4a1ba65aa66e05f8910f&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(parsedData);
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-centre">NewsBar - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((article) => {
            return (
              <div className="col-md-4" key={article.url} >
                <NewsItem
                  title={article.title !== null ? article.title.slice(0, 40) : ""}
                  description={article.description !== null ? article.description.slice(0, 80) : ""}
                  imgUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container mt-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page > Math.ceil(this.state.articles.length/this.state.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
