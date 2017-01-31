
// Required libraries
const chalk = require('chalk');
const Immutable = require('immutable');

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

      initialInterViewData.keySeq().toArray().some(roomKey => {
        console.log('+++ Room keys from interviewData', roomKey);
        return roomKey === room;
      });
      if (!initialInterViewData.get(room)) {
        store.dispatch(addRoom(room));
        initialInterViewData = store.getState().interview; // Reset with updated data
      }

      // console.log(`Store: ${store.getState().interview}`)
      const roomData = initialInterViewData.get(room).toJS();
      console.log('+++ Text being sent down for room:', roomData);

      // Create an action for the socket to emit to the requesting client
      const sendTextHistory = setText(roomData.editor.text);
      const sendTextOptions = setOptions(roomData.editor.options);
      const sendWhiteboardHistory = requestHistory(roomData.whiteboard.drawingHistory);

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
      socket.broadcast.to(room).emit('clientStoreAction', action); // Broadcast out to everyone but the sender.
      // TODO: lookup for rooms
    });
  });
};

module.exports = {
  socketPubSub
};
