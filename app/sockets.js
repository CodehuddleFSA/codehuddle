import io from 'socket.io-client';
export const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Client connected:', socket.id);
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
