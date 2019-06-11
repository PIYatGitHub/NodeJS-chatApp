const generateMsg = (nickname, msgText)=> {
  return {
    nickname,
    text: msgText,
    createdAt: new  Date().getTime()
  }
};

const generateURL = (nickname, url)=> {
  return {
    nickname,
    url,
    createdAt: new  Date().getTime()
  }
};
module.exports = {generateMsg, generateURL};
