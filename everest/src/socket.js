import io from 'socket.io-client';

const endpoint = process.env.REACT_APP_ENDPOINT_DEV || 'http://127.0.0.1:5000/';
const socket = io(endpoint, { 
    transports: ['websocket', 'polling', 'flashsocket'],
    autoConnect: false
});

export default socket;
