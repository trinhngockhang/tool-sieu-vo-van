import React, { Component } from 'react';
import LikePhoto from './LikePhoto';
import ViewVideo from './ViewVideo';
import Invite from './Invite';
import InvationVideo from './InviteByVideo';

class Function extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <LikePhoto/>
        <ViewVideo/>
        <Invite/>
        <InvationVideo/>
      </div>  
    )
  }
}

export default Function;