import Window from './index';
const listAccountWindow = [];
const listShutDownWindow = [];
export const login = async (username, password) => {
  try{
    const newWindow = new Window();
    await newWindow.init();
    await newWindow.login(username, password);
    if(newWindow.page.url().includes('www.facebook.com/login/')){
      console.log("login sai");
      return false;
    }else{
      console.log("dang nhap thanh cong");
      await newWindow.page.waitFor('div.linkWrap');
      const element = await newWindow.page.$eval("div.linkWrap", (element) => element.innerHTML);
      console.log("ten la:", element);
      listAccountWindow.push(newWindow);
      listAccount.push({name:element,username});
      return true;
    }
  }catch(err){
    console.log(err);
    return false;
  }
};
export const listAccount = [];

export const likePhoto = async (link) => {
  var numberSuccess = 0,numberFail = 0,numberLiked = 0;
  const result = await Promise.all(listAccountWindow.map((window) => window.likePhoto(link)));
  result.forEach((data, index) => {
    if(data === 0) numberSuccess++;
    else if(data === 1) numberLiked++;
    else numberFail++;
  });
  return {numberSuccess, numberFail, numberLiked};
};

export const viewVideo = async (link) => {
  var numberSuccess = 0,numberFail = 0;
  const result = await Promise.all(listAccountWindow.map((window) => window.viewVideo(link)));
  result.forEach((data, index) => {
    if(data) numberSuccess++;
    else numberFail++;
  });
  return {numberSuccess, numberFail};
};

export const invite = async (link) => {
  const result = await Promise.all(listAccountWindow.map((window) => window.invite(link)));
}

export const inviteVideo = async (link) => {
  const result = await Promise.all(listAccountWindow.map((window) => window.inviteVideo(link)));
}
  
export const loginMultiAcc = async (array = []) => {
  var numberSuccess = 0,numberFail = 0;
  const result = await Promise.all(array.map((data) => login(data[0],data[1])));
  result.forEach((doc, index) => {
    if(doc) numberSuccess++;
    else numberFail++;
  });
  return {numberSuccess, numberFail};
};

export const closeAll = async () => {
  await Promise.all(listAccountWindow.map((window) => window.close()));
  return;
}