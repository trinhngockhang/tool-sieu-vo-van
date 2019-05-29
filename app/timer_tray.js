const electron = require('electron');
const { Tray,app,Menu} = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow){
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
    this.on('click',this.onClick.bind(this));
    this.on('right-click',this.rightClick.bind(this));
  }

  rightClick(){
    const menuConfig = Menu.buildFromTemplate([{
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }]);
    this.popUpContextMenu(menuConfig);
  }

  onClick(event,bounds){
    const {x,y} = bounds;
    //window hight and width
    const {height,width} = this.mainWindow.getBounds();
    const yPosition = process.platform === 'darwin' ? y : y - height;
    if(this.mainWindow.isVisible()){
      this.mainWindow.hide();
    }else{
      this.mainWindow.setBounds({
        x: x - width/2,
        y: yPosition,
        height,
        width
      })
      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;
