const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString function', ()=>{
  it('should reject non string values',()=>{
    const response = isRealString({text:"fine"});
    expect(response).toBe(false);
  });
  it('should reject string with only spaces',()=>{
    const response = isRealString("  ");
    expect(response).toBe(false);
  });
  it('should allow string with valid characters',()=>{
    const response = isRealString(" lo t r ");
    expect(response).toBe(true);
  });
});
