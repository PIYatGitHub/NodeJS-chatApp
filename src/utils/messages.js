const generateMsg = (msgText)=> {
  return {
    text: msgText,
    createdAt: new  Date().getTime()
  }
};

const generateURL = (url)=> {
  return {
    url,
    createdAt: new  Date().getTime()
  }
};
module.exports = {generateMsg, generateURL};
