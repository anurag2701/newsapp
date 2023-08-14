import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  /* Class Based component */
  // static defaultProps = {
  //   country: "in",
  //   category: "general",
  //   pageSize: 20,
  // };
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };
  // Constructor
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };

  // console.log(props);
  // document.title = `${this.capitalizeFirstLetter(props.q ?? props.category)} - News Bar`;
  // }

  // componentDidMount runs After render.
  // async componentDidMount() {
  //   await this.fetchNews(page);
  // }

  useEffect(() => {
    fetchNews(page);
    return () => {};
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // handleNextClick = () => {
  //   this.setState({
  //     page: ++page,
  //     loading: true,
  //   });
  //   this.fetchNews();
  // };
  // handlePrevClick = () => {
  //   this.setState({
  //     page: --page,
  //     loading: true,
  //   });
  //   this.fetchNews();
  // };

  const fetchNews = async (pgnum = page) => {
    props.setProgress(15);
    let apiKey = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${
      props.category
    }&apiKey=${apiKey}&page=${pgnum}&pageSize=${props.pageSize}${props.q ? "&q=" + props.q : ""}`;
    // let data = await fetch(url);
    // used axios
    await axios.get(url).then((response) => {
      console.log(response);
      let parsedData = response.data;
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    });

    // Component based functions
    // this.setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });

    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fetchNews(page + 1);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "60px 0px" }}>
        NewsBar - Top Headlines from {`${capitalizeFirstLetter(props.category)}`}
      </h1>
      {/* Infinite scroll code */}
      {loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((article) => {
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
      {/* {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {articles.map((article) => {
              
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
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>

          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 20,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
