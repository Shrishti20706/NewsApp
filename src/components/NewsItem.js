import React, { Component } from 'react'

export default class NewsItem extends Component {


 
  render() {
    let {title,description,imageurl,newsUrl,author,source,date}=this.props;//extraction of prop(which is object) is done in class based component like this

    return (
      <div className='my-3'>
        
        <div className="card" >
          <div style={{
            display:"flex",
            justifyContent:"flex-end",
            position:"absolute",
            right:"0"
          }}>
          <span className=" badge rounded-pill bg-danger">{source}</span>

          </div>
          <img src={!imageurl?"https://meta.cdn.bubble.io/f1550965374835x373311315531899650/newsapi.svg":imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>

              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
