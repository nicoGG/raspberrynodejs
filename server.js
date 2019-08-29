require('rootpath')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sensor = require('node-dht-sensor');
var tempServicio = require('./temperatura/temp.servicio');
const config = require('config.json');
var puerto = 4000;

server.listen(puerto, function () {
    console.log('Servidor corriendo en puerto ' + puerto);
});

var pinSensor = 16;
var contenido = null;

io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
});

function obtenerTemperatura() {
    sensor.read(11, pinSensor, function (err, temp, hum) {
        if (!err) {
            contenido = JSON.stringify(
                {
                    temperatura: temp.toFixed(1),
                    humedad: hum.toFixed(1),
                    hora: new Date().toISOString()
                }
            );
            io.sockets.emit('temperatura',contenido);
        }
    });
}

setInterval(obtenerTemperatura, 2000);