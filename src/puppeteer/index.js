import puppeteer from 'puppeteer';
import { link } from 'fs';
import { type } from 'os';
import { TIMEOUT } from 'dns';
import eachLimit from 'async/eachLimit';

class Window{
  constructor(){
    this.init = this.init.bind(this);
    this.login = this.login.bind(this);
    this.close = this.close.bind(this);
  }
  async init(){
    this.browser = await puppeteer.launch({
        headless:true,
        'args' : [ '--incognito' ],
        'defaultViewport' : {'width' : 1366,'height' : 768}
      });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1366, height: 768});
    return;
  }
  async close(){
    console.log("dang tat");
    await this.browser.close();
  }
  async login(username, password){
    await this.page.goto('https://facebook.com');
    // await page.waitFor('input[name=email]');
    await this.page.$eval('#email', (el, username) => {
      el.value = username; 
    },username);
    // await page.waitFor('input[name=pass]');
    await this.page.$eval('#pass', (el, password) => {
      el.value = `${password}`
    },password);
    await Promise.all([
      this.page.$eval('#login_form', form => form.submit()),
      this.page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
  }
  async likePhoto(link){
    try{
      await this.page.goto(link);
      await this.page.waitFor('._6iis>div>span>._666k>div>a');  
      const check = await this.page.$eval('._6iis>div>span>._666k>div>a',(el) => {
        return el.getAttribute('aria-pressed');
      })
    if((check === 'false')){
      console.log('chua like');
      await this.page.click('._6iis>div>span>._666k>div>a');
      const checkPart2 = await this.page.$eval('._6iis>div>span>._666k>div>a',(el) => {
        return el.getAttribute('aria-pressed');
      })
      if(checkPart2 === 'false'){
        console.log('chua like');
        await this.page.click('._6iis>div>span>._666k>div>a');
      }
      return 0;
    }
    return 1;
    }catch(err){
      console.log(err);
      return 2;
    }
  }

  async viewVideo(link){
    try{
      await this.page.goto(link);
      //await this.page.click('#u_0_1a>img');
      return true;
    }catch(err){
      return false;
    }
  }

  async inviteVideo(link){
    await this.page.goto(link);
    await this.page.waitFor('._7gm_');
    await this.page.click('._7gm_');
    await this.page.waitFor('#reaction_profile_pager', {timeout:2000});
    //await this.page.waitFor('_42ft _4jy0 _4jy3 _517h _51sy', {timeout:5000});
    await this.checkSeemore();
    await this.page.evaluate(() =>{
      var data = [];
      let elements = document.getElementsByClassName('_42ft _4jy0 _4jy3 _517h _51sy');
      for (var element of elements){
        if(element.textContent === "Invite"){
          data.push(element);
        }
      }
      let time = 1000;
      data.forEach((element,index) => {
        setTimeout(() => {
          element.click();
        },time * index);
      });
    });
  }

  async invite(link){
    await this.page.goto(link);
    await this.page.waitFor('#fbPhotoSnowliftOwnerButtons');
    await this.page.evaluate(() => {
      let arr = [];
      let elements = document.getElementsByClassName('_2x4v');
      let i = 1;
      for(var element of elements){
        i++;
        if(i == 3) element.click();
      }
    })
    await this.page.waitFor('#reaction_profile_pager', {timeout:2000});
    //await this.page.waitFor('_42ft _4jy0 _4jy3 _517h _51sy', {timeout:5000});
    await this.checkSeemore();
    await this.page.evaluate(() =>{
      var data = [];
      let elements = document.getElementsByClassName('_42ft _4jy0 _4jy3 _517h _51sy');
      for (var element of elements){
        if(element.textContent === "Invite"){
          data.push(element);
        }
      }
      let time = 1000;
      data.forEach((element,index) => {
        setTimeout(() => {
          element.click();
        },time * index);
      });

    // eachLimit(data,1, function(inviteButton, callback){
    //   setTimeout(async () => {
    //     await inviteButton.click();
    //     callback();
    //   },1000);
    // },function(err){
    //   if(err){
    //     console.log(err);
    //     return err;
    //   }
    //   return;
    // })
    });
  };

  async checkSeemore(){
    let i = 0;
    while(true){
      if(await this.page.$('#reaction_profile_pager') !== null){
        try{
          await this.page.click('#reaction_profile_pager');
        }catch(err){
        }
      }else{
        return;
      }
    }
  }
};

export default Window;
