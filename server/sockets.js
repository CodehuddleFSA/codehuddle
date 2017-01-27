
// Required files
const { setText, addRoom } = require('./redux/reducers/interview');
const { store } = require('./redux/store');

// Store room data locally for reload
const roomData = {};

// Action creators; TODO: move to a separate file
// const setText = text => ({
//   type: 'SET_TEXT',
//   text
// });

const socketPubSub = io => {
  io.on('connection', (socket) => {
    console.log('Socket client connected', socket.id);
    let room;

    socket.on('wantToJoinRoom', (roomName) => {
      room = roomName;
      socket.join(room);

      // Redux
      // Grab state data
      // If room doesn't exist, send out an action to create it with default text
      // Then issue a getstate to grab the data from the room
      const interviewData = store.getState().interview;
      if (!interviewData[room]) {
        store.dispatch(addRoom(room));
      }

      // If room doesn't exist, set the default value
      if (!roomData[room]) roomData[room] = { editor: { value: 'default val' } };
      // Create a new action with the current text
      let action = setText(roomData[room].editor.value);

      socket.emit('action', action);
    });

    socket.on('action', (action) => { // When an action is received, send it out. This acts like a reducer.
      // Set room for action
      action.room = room;

      if (action.type === 'SET_TEXT') {
        store.dispatch(action);
        roomData[room].editor.value = action.text;
      }

      action.meta.remote = false; // Remove the remote true to prevent continuous back and forth.
      socket.broadcast.emit('action', action); // Broadcast out to everyone but the sender.
    });
  });
};

module.exports = {
  socketPubSub
};
