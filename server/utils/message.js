const moment = require('moment');
const date = moment();
const linuxDate = date.valueOf();

var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt: linuxDate
  }
};
module.exports = {generateMessage};
