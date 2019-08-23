const config = require('config.json');
const db = require('helpers/db');
const Temp = db.temperatura;

module.exports = {
    guardarTemperatura
};

async function guardarTemperatura(temp) {
    console.log('RECIBE ' + temp);
    const tempe = new Temp(temp);

    await tempe.save();
}