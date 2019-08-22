var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sensor = require('node-dht-sensor');
var puerto = 5000;

server.listen(puerto, function () {
    console.log('Servidor corriendo en puerto ' + puerto);
});

var pinSensor = 16;
var contenido = null;


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
            console.log('TEMP: ' + contenido);
        }
    });
}

setInterval(obtenerTemperatura, 1000);