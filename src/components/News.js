import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  article=[];
  static defaultProps={
    country:"in",
    category:"general",
    pageSize:5,
    id:"home",
    progress:10
 
  }
 
  PropTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number,
    id:PropTypes.string
  }

  Capitalizefirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props){
    super(props)
    this.state={
      article:this.article,
      loading:true,
      page:1,
      totalResults:0,
      

    }
    document.title=`NewsMonkey - ${this.Capitalizefirstletter(this.props.id)}`    
  }
    
  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(50);
    let parseData= await data.json();
    this.props.setProgress(70);
    this.setState({article:parseData.articles,totalResults:parseData.totalResults,loading:false})
    this.props.setProgress(100);
  }
  
  
  async componentDidMount(){
    this.updateNews()
}

fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data=await fetch(url);
    let parseData= await data.json();
    this.setState({article:this.state.article.concat(parseData.articles),totalResults:parseData.totalResults})
  };  
  
  render() {
   
    return (
      
      <>
        
          <h1 className="text-center" style={{margin:'70px 0px 10px 0px'}}>NewMonkey - Top headlines from {this.props.category}</h1>
          {this.state.loading &&<Spinner></Spinner>}
          <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length!==this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container">
          <div className="row">
          {this.state.article.map((element)=>{

             return   <div className="col-md-4" key={element.url} >
             <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItems> 
             </div>

          })}
        
        
        </div>
        </div>
        </InfiniteScroll>
          
 
      </>
      
    )
  }
}

export default News