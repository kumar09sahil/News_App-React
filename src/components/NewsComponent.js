import React, { Component } from "react";
import ItemNews from "./ItemNews";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {
  static defaultProps = {
    pagesize: 15,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pagesize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("i m opened in the news component");
    // console.log(this.articles)
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalPage: 0,
    };
    document.title = `${this.props.category} - NewsRunner`;
  }

  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e03272b625b41e0bf18079374255ec0&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.props.setProgress(0);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalPage: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8467fb716d94275af3715017a1b6cdb&page=1&pageSize=${this.props.pagesize}`
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({articles:parsedData.articles})
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e03272b625b41e0bf18079374255ec0&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // Check if there are more articles to load
    const hasMoreArticles = this.state.articles.length < this.state.totalPage;

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalPage: parsedData.totalResults,
      loading: false,
    });

    // Update the hasMore prop based on whether there are more articles
    this.infiniteScrollRef &&
      this.infiniteScrollRef.setState({ hasMore: hasMoreArticles });
  };

  // handleprevclick = async () => {
  // console.log("previous is clicked");
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8467fb716d94275af3715017a1b6cdb&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`
  // this.setState({loading:true})
  // let data = await fetch(url);
  // let parsedData = await data.json();
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handlenextclick = async () => {
  //   if (
  //     this.state.page + 2 >
  //     Math.ceil(this.state.totalPage / this.props.pagesize)
  //   ) {
  //   } else {
  // console.log("next is clicked");
  // console.log(this.state.page);
  // console.log(this.state.page+1 > Math.ceil(this.state.totalPage/this.props.pagesize))
  // this.setState({loading:true})
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8467fb716d94275af3715017a1b6cdb&page=${this.state.page+1}&pageSize=${this.props.pagesize}`
  // let data = await fetch(url);
  // let parsedData = await data.json();
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   }
  // };
  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ marginTop: " 85px", marginBottom: "26px" }}
        >{`NewsRunner : Top ${this.props.category} Headlines`}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalPage}
          loader={<Spinner />}
        >
          <div className="container">
            {console.log(this.state.articles.length)}

            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div
                    className="col-md-4 my-3"
                    exact="true"
                    key={
                      !element.urlToImage
                        ? element.publishedAt
                        : element.urlToImage
                    }
                  >
                    <ItemNews
                      title={element.title ? element.title.slice(0, 50) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : ""
                      }
                      imgurl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://images.wsj.net/im-851829/social"
                      }
                      url={element.url}
                      author={element.author}
                      source={element.source.name}
                      time={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 2 >
              Math.ceil(this.state.totalPage / this.props.pagesize)
            }
            className="btn btn-dark "
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default NewsComponent;
