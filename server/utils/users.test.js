const {Users} = require('./users');
const expect = require('expect');

describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:1,
      name:'Mike',
      room:'Node Course'
    },
    {
      id:2,
      name:'Jen',
      room:'React Course'
    },
    {
      id:3,
      name:'Caleb',
      room:'Node Course'
    }]
  });

  it('should add a new user',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'Justin',
      room:'The Office Fans'
    };
    var responseUser = users.addUser(user.id, user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course',()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Caleb']);
  });
  it('should return names for React course',()=>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
  it('should remove a user',()=>{
    var user = users.removeUser(1);
    expect(user.id).toBe(1);
    var useragain = users.getUser(1);
    expect(useragain).toBe(undefined);
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user',()=>{
    var user = users.removeUser(99);
    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });
  it('should find user',()=>{
    var user = users.getUser(1);
    expect(user.id).toBe(1);
    expect(user.name).toBe('Mike');
  });
  it('should not find user',()=>{
    var user = users.getUser(99);
    expect(user).toBe(undefined);
  });
});
