const users = [];

const addUser = ({id, nickname, room})=>{
  // cleaning the data
  nickname = nickname.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!nickname || !room) {
    return {
      error: 'Nickname and room are required!'
    }
  }
  //check for existing user
  const existingUser = users.find((user) => user.room === room && user.nickname === nickname)
  if (existingUser) {
    return {
    error: 'Nickname has already been taken!'
    }
  }

  //store the user
  const user = {id, nickname, room};
  users.push(user);
  return {user};
};

const removeUser = (id)=>{
  const targetUserIndex = users.findIndex((user)=> user.id===id);
  if (targetUserIndex !== -1) return users.splice(targetUserIndex, 1)[0];
};

const getUser = (id)=>{
  const targetUserIndex = users.findIndex((user)=> user.id===id);
  if (targetUserIndex !== -1) return users[targetUserIndex];
  return undefined;
};

const getUsersInRoom = (room) =>{
  return users.filter((user)=>user.room===room);
};

module.exports = {addUser,removeUser,getUser,getUsersInRoom};