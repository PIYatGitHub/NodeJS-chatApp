const generateMsg = (msgText)=> {
  return {
    text: msgText,
    createdAt: new  Date().getTime()
  }
};
module.exports = {generateMsg};
