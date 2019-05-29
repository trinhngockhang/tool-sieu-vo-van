import React, { Component } from 'react';
import css from './function.css';
import * as Puppeteer from '../../puppeteer/util';
import Spinner from 'react-spinner-material';

class ViewVideo extends Component{
  constructor(props){
    super(props);
    this.like = this.like.bind(this);
    this.close = this.close.bind(this);
    this.state = {numberSuccess : 0, numberFail : 0, onResult : 'none'}
  }
  async like(){
    const result = await Puppeteer.viewVideo(this.refs.linkInput.value);
    this.setState({numberSuccess:result.numberSuccess,numberFail:result.numberFail, onResult:'list-item'})
    console.log(result);
  }

  async close(){
    this.setState({...this.state, onResult:'none'})
  }

  render(){
    return(
      <div className="d-flex flex-column function-box">
        <h2 className="title">View video on Facebook</h2>
        <input placeholder="Link video" className="photoLink p-2" ref="linkInput"></input>
        <button className="submit-function p-3" onClick={this.like}>Submit</button>
        <div className="result" style={{display : this.state.onResult}}>
          <div>
          <p>✓Số nick thực hiện thành công:{this.state.numberSuccess}</p>
          <p>✕Số nick thực hiện thất bại:{this.state.numberFail}</p>
          </div> 
          <button onClick={this.close} className="button-close">OK</button>
        </div> 
      </div>
    )
  }
};

export default ViewVideo;