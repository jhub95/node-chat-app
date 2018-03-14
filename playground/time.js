const moment = require('moment');

var date = moment();
console.log(date.valueOf());
console.log(date.format('MMM Do, YYYY'));


//  6:05 am
console.log(date.format('h:mm a'));
