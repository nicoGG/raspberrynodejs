require('rootpath')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sensor = require('node-dht-sensor');
const config = require('config.json');
var port = 4000;

server.listen(port, function () {
    console.log('Servidor corriendo en puerto ' + port);
});

var pinSensor = 16;
var body = null;

io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
});

function getTemp() {
    sensor.read(11, pinSensor, function (err, temp, hum) {
    	console.log('TEMP',temp);
    	console.log('HUMIDIFY',hum);

        if (!err) {
            body = JSON.stringify(
                {
                    temperature: temp.toFixed(1),
                    humidify: hum.toFixed(1),
                    date: new Date().toISOString()
                }
            );
            io.sockets.emit('temp',body);
        }
    });
}

setInterval(getTemp, 2000);