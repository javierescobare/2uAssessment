const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    pingTimeout: 60000,
});
const port = 8080;

io.on("connection", function (socket) {
    console.debug("New connection", socket.id);

    socket.on("disconnect", function (reason) {
        console.debug("Disconnecting from socket. Reason:", reason, socket.id);
    });

    socket.on("new_invoice", function (invoice) {
        console.log("new_invoice", invoice);
        io.emit("new_invoice", invoice);
    });

    socket.on("updated_invoice", function (invoice) {
        console.log("updated_invoice", invoice);
        io.emit("updated_invoice", invoice);
    });
});

server.listen(process.env.PORT || port, function () {
    console.debug(`listening on *:${port}`);
});
