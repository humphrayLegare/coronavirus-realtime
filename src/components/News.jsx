import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class News extends Component {

  constructor(props){
    super(props)
    this.state = {
      news : []
    }
    // this.news_api_url = process.env.REACT_APP_NEWS_API_URL

    //bind event
    this.getNews = this.getNews.bind(this)
    this.addUrlToArticle = this.addUrlToArticle.bind(this)
  }

  componentDidMount(){
    //create headers
    let httpHeaders = {
      'Accept':'applications/json',
    }
    
    let headers = new Headers(httpHeaders)

    //create request
    let complete_url = process.env.REACT_APP_NEWS_API_URL + `q=coronavirus&from=2020-03-20&sortBy=popularity&apikey=` + process.env.REACT_APP_NEWS_API_KEY;
    let request = new Request(complete_url, {
      headers: headers,
      method: 'GET',
      mode: 'cors'
    })
    

    //fetch the news api
    try {
      fetch(request)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState((state,props) => ({news : data.articles }))
      })

    } catch {
      //@TODO implement catch error
    }
  }

  /**
   * @param {string} content 
   * @param {string} url
   * @desc 'replace [+ n] words from description and by url to article'
   */
  addUrlToArticle(content, url){
    const regex = /[\[+]{1,}[0-9]{1,}[\s]{1}[a-z]{1,}[\]]{1}/gmi;
    return content.replace(regex, "")
  }


  getNews() {
    return this.state.news.map((article)=>{

      let reformatContent = this.addUrlToArticle(article.content, article.url)
      let link = <a href={article.url} target="_blank">Read more</a>

      return(
        <div key={article.title} className="article-wrapper">
          <h3 className="article-title">{article.title}</h3>
          <img className="article-image" src={article.urlToImage} alt={article.title} />
          <p className="article-description">{article.description}</p>
          <p className="article-content">{reformatContent}{link}</p>
        </div>
      )
    })
  }


  render() {

    let news = this.state.news.length > 0 ? this.getNews() : false
    
    return (
      <div>
        {news.length > 0 && news}
      </div>
    )
  }
}
