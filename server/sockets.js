
// Required libraries
const chalk = require('chalk');

// Required files
const { setText, addRoom } = require('./redux/reducers/interview');
const { store } = require('./redux/store');

// This establishes the publish and subscribe function for the specific socket instance
const socketPubSub = io => {
  io.on('connection', (socket) => {
    console.log(chalk.green(`Socket client connected: ${socket.id}`));

    let room;

    // Socket just connected, and wants to join a room. Grab the room information and send back to the user.
    socket.on('wantToJoinRoom', (roomName) => {
      room = roomName;
      socket.join(room);

      let initialInterViewData = store.getState().interview;
      let action;

      // If room doesn't exist, send out an action to create it with default text
      if (!initialInterViewData[room]) {
        store.dispatch(addRoom(room));
        initialInterViewData = store.getState().interview; // Reset with updated data
      }

      // Create an action for the socket to emit to the requesting client
      action = setText(initialInterViewData[room].editor.text);

      socket.emit('clientStoreAction', action);
    });

    // Socket sends out a client-side store action
    socket.on('clientStoreAction', (action) => { // When an action is received, send it out. This acts like a reducer.
      action.room = room; // Set room that the socket is in

      if (action.type === 'SET_TEXT' || action.type === 'SET_COORDINATES') {
        store.dispatch(action);
      }

      action.meta.remote = false; // Remove the remote true to prevent continuous back and forth.
      socket.broadcast.emit('clientStoreAction', action); // Broadcast out to everyone but the sender.
    });
  });
};

module.exports = {
  socketPubSub
};
