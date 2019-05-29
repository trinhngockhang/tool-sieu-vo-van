import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ipcRenderer } from "electron";
import Menu from './Menu';
import Function from './Function';
import * as Puppeteer from '../puppeteer/util';

//const APP_DATA = JSON.parse(localStorage.getItem("__INITIAL_STATE__"));

class App extends Component {
  componentWillMount(){
    ipcRenderer.on('close-puppeteer', async () => {
      console.log("da gui vao day");
      await Puppeteer.closeAll();
      ipcRenderer.send('close-puppeteer');
    });
  }
  render() {
    return (
      <div>
        <Menu/>
        <Function/>
      </div>
    );
  }
}
export default App;
