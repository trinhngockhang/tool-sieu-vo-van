const electron = require('electron');
const { BrowserWindow } = electron;

class mainWindow extends BrowserWindow{
  constructor(path){
    super({
    height:700,
    width:800,
    frame: true,
    resizable:false,
    webPreferences: {backgroundThrottling: false}
    });
    this.loadURL(path); 
  }
}

module.exports = mainWindow;
