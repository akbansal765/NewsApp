import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string,
  }
/*
  articles = [
    {
      "source": {
      "id": "bbc-news",
      "name": "BBC News"
      },
      "author": "BBC News",
      "title": "Supreme Court rules Idaho women can have abortions during health emergencies",
      "description": "The only exception to Idaho's near-total abortion ban is for the life - but not the health - of the mother.",
      "url": "https://www.bbc.co.uk/news/articles/cgll0rgk28jo",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/7979/live/8de08670-3498-11ef-812a-f969b7a80bd3.jpg",
      "publishedAt": "2024-06-27T16:37:18.141219Z",
      "content": "The short, unsigned opinion returns the case to a lower court.\r\nIt closely resembled a document that briefly appeared on the court's website the day before, before it was swiftly removed, an apparent… [+940 chars]"
      },
      {
      "source": {
      "id": "bbc-news",
      "name": "BBC News"
      },
      "author": "BBC News",
      "title": "Gaza: Long campaign by Israel may follow war",
      "description": "The most intense fighting could be ending, but Gaza could see Israeli action for a long time to come.",
      "url": "https://www.bbc.co.uk/news/articles/c80xlvkx92go",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/8f2e/live/089a8310-3495-11ef-bbe0-29f79e992ddd.jpg",
      "publishedAt": "2024-06-27T16:37:17.0789852Z",
      "content": "Whatever happens on Israel's northern border, the conflict in Gaza, even if at a far lower level of intensity, shows no sign of coming to an end. Moves towards a ceasefire have lost momentum again, w… [+1752 chars]"
      }
  ] 
  */
  capitalizeFunction = (string) => {
     return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log('constructor');

    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1
    }
    // changing the title and capitalizing the category name
    document.title = `${this.capitalizeFunction(this.props.category)} - NewsMonkey`;
  }

    async updateNews(pageNum){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6aacef9e67344d581adf84352ccc13f&page=${this.state.page + pageNum}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
  
      this.setState({
        articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading: false});
    }
  

    // after adding &page=2 we can fetch the other remaining objects, we can read newsAPI docs for more info
    async componentDidMount(){
    this.updateNews(0);
    
    }

  handleBackPage = async ()=>{
    // console.log('back');

    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6aacef9e67344d581adf84352ccc13f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // const data = await fetch(url);
    // const parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // });
    this.setState({page: this.state.page - 1});
    this.updateNews(-1);

  }

  handleNextPage = async ()=>{
      // console.log('next');
      // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6aacef9e67344d581adf84352ccc13f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // const data = await fetch(url);
      // const parsedData = await data.json();
      // console.log(parsedData);
      
      // this.setState({
      //   articles: parsedData.articles,
      //   page: this.state.page + 1,
      //   loading: false
      // });
      this.setState({page: this.state.page + 1});
      this.updateNews(1);

  }
 
  render() {
    return (
      <div className='container my-3'>
                <h3 className='text-center'>News Monkey - Top {this.capitalizeFunction(this.props.category)} Headlines</h3>

                {this.state.loading && <Spinner />}

              <div className="row">
              {!this.state.loading && this.state.articles.map((el)=> {
                return <div className="col-md-4" key={el.url}>
                  <NewsItem title = {el.title ? el.title.slice(0, 40): ''} description = {el.description ? el.description.slice(0, 80): ''} imageUrl = {el.urlToImage ? el.urlToImage : 'no-image-icon-11.png'} newsUrl = {el.url} author = {el.author} date = {el.publishedAt} source = {el.source.name}/>
                </div>
              })}
              </div>
              {!this.state.loading && <div className="container d-flex justify-content-between">
              <button type="button" disabled = {this.state.page <= 1} onClick={this.handleBackPage} className="btn btn-warning">&larr; Back</button>
              <button type="button" disabled = {(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} onClick={this.handleNextPage} className="btn btn-warning">Next &rarr;</button>
              </div>}
            </div>
      );
  }
}

export default News
