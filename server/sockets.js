
// Required libraries
const chalk = require('chalk');

// Required files
const { addRoom, setText, requestHistory, setOptions } = require('./redux/reducers/interview');
const { store } = require('./redux/store');

// Util chalk logger for backend socket messages
function socketLog (socketId, message) {
  console.log(
    chalk.bgYellow.white(` `),
    chalk.dim(`[Socket] client ID: ${socketId}`),
    chalk.yellow(message)
  );
}

// This establishes the publish and subscribe function for the specific socket instance
const socketPubSub = io => {
  io.on('connection', (socket) => {
    socketLog(socket.id, `is now connected`);

    let room;

    // Socket just connected, and wants to join a room. Grab the room information and send back to the user.
    socket.on('wantToJoinRoom', (roomName) => {
      // TODO: put into thunk action creator
      socketLog(socket.id, `has joined room: ${roomName}`);
      room = roomName;
      socket.join(room);

      let initialInterViewData = store.getState().interview;

      // If room doesn't exist, send out an action to create it with default text
      if (!initialInterViewData[room]) {
        store.dispatch(addRoom(room));
        initialInterViewData = store.getState().interview; // Reset with updated data
      }

      // Create an action for the socket to emit to the requesting client
      const sendTextHistory = setText(initialInterViewData[room].editor.text);
      const sendTextOptions = setOptions(initialInterViewData[room].editor.options);
      console.log('These are the text options', sendTextOptions);
      const sendWhiteboardHistory = requestHistory(initialInterViewData[room].whiteboard.drawingHistory);

      socket.emit('clientStoreAction', sendTextHistory);
      socket.emit('clientStoreAction', sendWhiteboardHistory);
      socket.emit('clientStoreAction', sendTextOptions);
    });

    // Socket sends out a client-side store action
    socket.on('clientStoreAction', (action) => { // When an action is received, send it out. This acts like a reducer.
      action.room = room; // Set room that the socket is in

      const acceptableActionTypes = new Set(
        ['SET_TEXT', 'SET_COORDINATES', 'SET_OPTIONS']
      );

      if (acceptableActionTypes.has(action.type)) {
        store.dispatch(action);
      }

      action.meta.remote = false; // Remove the remote true to prevent continuous back and forth.
      socket.broadcast.emit('clientStoreAction', action); // Broadcast out to everyone but the sender.
      // TODO: lookup for rooms
    });
  });
};

module.exports = {
  socketPubSub
};
