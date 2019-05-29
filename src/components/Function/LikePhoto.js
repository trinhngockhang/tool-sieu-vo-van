import React, { Component } from 'react';
import css from './function.css';
import * as Puppeteer from '../../puppeteer/util';
import Spinner from 'react-spinner-material';

class LikePhoto extends Component{
  constructor(props){
    super(props);
    this.like = this.like.bind(this);
    this.close = this.close.bind(this);
    this.state = {numberSuccess : 0, numberFail : 0,numberLiked:0, onResult : 'none', loading:'none'}
  }
  async like(){
    this.setState({...this.state, loading:'block'});
    const result = await Puppeteer.likePhoto(this.refs.linkInput.value);
    this.setState({numberSuccess:result.numberSuccess,numberFail:result.numberFail,
      numberLiked:result.numberLiked, onResult:'list-item',loading:'none'})
    console.log(result);
  }

  async close(){
    this.setState({...this.state, onResult:'none'})
  }

  render(){
    return(
      <div className="d-flex flex-column function-box">
        <h2 className="title">Like photo on Facebook</h2>
        <input placeholder="Link photo" className="photoLink p-2" ref="linkInput"></input>
        <button className="submit-function p-3" onClick={this.like}>Submit</button>
        <div className="result" style={{display : this.state.onResult}}>
          <div>
          <p>✓Số nick thực hiện thành công:{this.state.numberSuccess}</p>
          <p>✓Số nick đã like trước đó:{this.state.numberLiked}</p>
          <p>✕Số nick thực hiện thất bại:{this.state.numberFail}</p>
        </div>
          <button onClick={this.close} className="button-close">OK</button>
        </div> 
        <div style={{display : this.state.loading}}>
          <Spinner size={70} spinnerColor={"#2768ca"} spinnerWidth={2} visible={true} />
        </div> 
      </div>
    )
  }
};

export default LikePhoto;