import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  //while using js class based comp. make constructor and also call super class constructor inside it

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello I am constructor from news component")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0

    }//same as Usestate hook in function based component
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsApp`;

    //state are used when you want to change dynamically but if you dont want to change again and again then use prop(read only)
  }

  // order of running 1.constructor->2.render ->3.componentDidMount
  //componentDidMount() is life cycle method which will run after render method

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })

    let data = await fetch(url);
    this.props.setProgress(40);

    let parseData = await data.json()
    this.props.setProgress(80);

    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }
 
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20fd138ddf2d4cd1892f19384e8a4661&page=${this.state.page}&pageSize=${this.props.pageSize}`

    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    })  };
  render() {
    return (
      <>

        <h2 style={{marginTop:'80px'}}>NewsApp-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          
          <div className="container">
          <div className="row">
            {/* .map to iterate element using unique key */}
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                {/* to show equal card use slice ------<NewsItem  title={element.title?element.title.slice(0,88):""} description={element.description} imageurl={element.urlToImage} newsUrl={element.url}/>
               */}

              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        
      </>
    )
  }
}
