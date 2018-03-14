const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage function', ()=>{
  it('should generate the correct message object',()=>{

    const message = generateMessage('Bubba','does this work');

    expect(message.from).toBe('Bubba');
    expect(message.text).toBe('does this work');
    expect(message.createdAt).toBeA('number');
  });

});
