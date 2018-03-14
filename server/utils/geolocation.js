var generateLocationMessage = (from,lat,long)=>{
  return {
    from,
    url: `https://www.google.com/maps/?q${lat},${long}`,
    createdAt: new Date().getTime()
  }
};
module.exports = {generateLocationMessage};
