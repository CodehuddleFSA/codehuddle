console.log('in socket setup');

const socket = window.io(window.location.origin);

socket.on('connect', () => {
  console.log('I have made a persistent two-way connection to the server!');
});
