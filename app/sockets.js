
// Grab socket reference from window
export const socket = window && window.io(window.location.origin);

socket.on('connect', () => {
  console.log('Client connected', socket.id);

  // On connected, tell the backend what room the client wants to join
  // socket.emit('wantToJoinRoom', 'spongebob'); // Set to 'spongebob', until we have a way of setting a room from the frontend
});

// Sockets Middleware
export const socketsEmit = (socket, channelName) => store => {
  socket.on(channelName, store.dispatch); // When action is received, disptach to store

  return next => action => {
    if (action.meta && action.meta.remote) {
      socket.emit(channelName, action); // If action has meta.remote = true, this emit to server;
    }
    return next(action);
  };
};

export const socketsJoinRoom = roomName => {
  socket.emit('wantToJoinRoom', roomName);
};
