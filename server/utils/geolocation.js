const moment = require('moment');
const date = moment();
const linuxDate = date.valueOf();

var generateLocationMessage = (from,lat,long)=>{
  return {
    from,
    url: `https://www.google.com/maps/?q${lat},${long}`,
    createdAt: linuxDate
  }
};
module.exports = {generateLocationMessage};
