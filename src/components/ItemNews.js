import React, { Component } from "react";

export class ItemNews extends Component {
  render() {
    let { title, description, imgurl, url, author, source, time } = this.props;
    return (
      <div>
        <div className="card" >
          <img src={imgurl} className="card-img-top" alt="..." />
                <span className="position-absolute   badge rounded-pill bg-danger" style={{right:'0%',zIndex:1}}>
                  {source}
                  <span className="visually-hidden">unread messages</span>
                </span>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author?'unknown':author} on {new Date(time).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn sm  btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemNews;
