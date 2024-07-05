import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';

const News = (props) => {

  const capitalizeFunction = (string) => {
     return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

    
  

    const updateNews = async (pageNum) => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + pageNum}&pageSize=${props.pageSize}`;
      props.setProgress(10);
      setLoading(true);
      const data = await fetch(url);
      props.setProgress(30);

      const parsedData = await data.json();
      console.log(parsedData);
      props.setProgress(70);


      parsedData.articles.forEach((el, i) => {
        el.uniqueID = i
      })
  
      console.log(parsedData.articles);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      props.setProgress(100);

    };
  
    // after adding &page=2 we can fetch the other remaining objects, we can read newsAPI docs for more info
    useEffect(() => {
           // changing the title and capitalizing the category name
           document.title = `${capitalizeFunction(props.category)} - NewsMonkey`;
           
           updateNews();
           // eslink-disable-next-line
      },
     []);


  const fetchMoreData  = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);  // here we have updated the page to page+ 1 in above url and setPage state set to page + 1 after the url. because when were doing the set page before the url our page was not updaing the page immediately, it was taking some time in which same page was rendered again which was causing the unique key error in console
      setLoading(true);
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);

      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);

  }

 
    return (
              <>
                <h3 className='text-center' style={{marginTop: '80px'}}>News Monkey - Top {capitalizeFunction(props.category)} Headlines</h3>
                {loading && <Spinner />}
                <InfiniteScroll
                  dataLength={articles.length}
                  next={fetchMoreData}
                  hasMore={articles.length !== totalResults}
                  loader={loading && <Spinner />}>
                    <div className="container">
                        <div className="row">
                        {articles.map((el)=> {
                          return <div className="col-md-4" key={el.url}>
                            <NewsItem title = {el.title ? el.title.slice(0, 40): ''} description = {el.description ? el.description.slice(0, 80): ''} imageUrl = {el.urlToImage ? el.urlToImage : 'no-image-icon-11.png'} newsUrl = {el.url} author = {el.author} date = {el.publishedAt} source = {el.source.name}/>
                          </div>
                        })}
                        </div>
                        </div>
              </InfiniteScroll>
            </>
      );
  
}

export default News


// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general'
// }

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string,
}
