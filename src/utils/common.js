export const checkAccountExist = (array = [], element) => {
  let checkExist = false;
  array.forEach(data => {
    console.log('data',data[0]);
    console.log('element,', element[0]);
    if(data[0] === element[0] && data[1] === element[1]){
      checkExist = true;
    }
    else if(data[0] === element[0]){
      console.log('da trung nhau');
      checkExist = true;
    } 
  });
  return checkExist;
};

export const addAccount = (array = [], element) => {
 
}