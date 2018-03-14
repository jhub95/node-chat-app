const expect = require('expect');
const {generateLocationMessage} = require('./geolocation');

describe('generateLocationMessage function', ()=>{
  it('should generate the correct location message object',()=>{

    const message = generateLocationMessage('Bubba',44,55);
    expect(message.from).toBe('Bubba');
    expect(message.url).toBe('https://www.google.com/maps/?q44,55');
    expect(message.createdAt).toBeA('number');
  });

});
