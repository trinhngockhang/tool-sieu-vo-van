const electron = require('electron');
const path = require('path');
const express = require('express');
const { app, ipcMain } = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_Window');
let tray;
const server = express();
require("babel-core/register");
require("babel-polyfill");
app.on('ready',async () => {
  //await createBrowser();
  
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
  mainWindow.webContents.send('test');
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  mainWindow.on('close', function(e){
    if(mainWindow){
      e.preventDefault();
      mainWindow.webContents.send('close-puppeteer');
      setInterval(() => {
        app.quit();
      }, 5000);
    }
  });
})

ipcMain.on("update-timer", (event, timeLeft) => {
  //tray.setTitle(timeLeft);
})

ipcMain.on('close-puppeteer', (event) => {
  mainWindow = null;
  app.quit();
})