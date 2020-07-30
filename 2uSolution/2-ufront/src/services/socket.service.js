import * as io from 'socket.io-client';

let socket;

export default function connectSocket(onNewInvoiceCb, onUpdatedInvoiceCb) {
  socket = io.connect(process.env.REACT_APP_SOCKET_URL);

  socket.on('connect', function () {
    console.log('Socket connected');
  });

  socket.on('disconnect', function () {
    console.log('Socket disconnected');
  });

  socket.on('new_invoice', function (data) {
    console.log('New Invoice', data);
    onNewInvoiceCb(data);
  });

  socket.on('updated_invoice', function (data) {
    console.log('Updated Invoice', data);
    onUpdatedInvoiceCb(data);
  });
}
