//same as news.js but here we used next and previous button

//and in news we are using infinite scroll(ref:react infinite scroll)
//top loading bar to just show progress because we are looading page(from react top loading bar)
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export default class NewsOld extends Component {
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

  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello I am constructor from news component")
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsApp`;

    //state are used when you want to change dynamically but if you dont want to change again and again then use prop(read only)
  }

  // order of running 1.constructor->2.render ->3.componentDidMount
  //componentDidMount() is life cycle method which will run after render method

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20fd138ddf2d4cd1892f19384e8a4661&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })

    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }




  async componentDidMount() {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20fd138ddf2d4cd1892f19384e8a4661&page=1&pageSize=${this.props.pageSize}`
    //this.setState({ loading: true })
    //
    //let data = await fetch(url);
    //let parseData = await data.json()
    //console.log(parseData);
    //this.setState({
    //  articles: parseData.articles,
    //  totalResults: parseData.totalResults,
    //  loading: false
    //})
    this.updateNews();
  }
  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20fd138ddf2d4cd1892f19384e8a4661&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //    this.setState({ loading: true })
    //let data = await fetch(url);
    //let parseData = await data.json()
    //console.log(parseData);
    //
    //    this.setState({
    //  page: this.state.page + 1,
    //  articles: parseData.articles,
    //  loading: false
    //})
    //
    //}
    this.setState({ page: this.state.page + 1 })
    this.updateNews();


  }

  handlePreviousClick = async () => {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20fd138ddf2d4cd1892f19384e8a4661&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //this.setState({ loading: true })
    //
    //let data = await fetch(url);
    //let parseData = await data.json()
    //console.log(parseData);
    //
    //
    //this.setState({
    //  page: this.state.page - 1,
    //  articles: parseData.articles,
    //  loading: false
    //})
    this.setState({ page: this.state.page - 1 })
    this.updateNews();

  }

  render() {
    return (
      <div className='container my-3'>

        <h2>NewsApp-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

        {this.state.loading && <Spinner />}

        <div className="row">
          {/* .map to iterate element using unique key */}
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />

              {/* to show equal card use slice ------<NewsItem  title={element.title?element.title.slice(0,88):""} description={element.description} imageurl={element.urlToImage} newsUrl={element.url}/>
               */}

            </div>
          })}
        </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}
