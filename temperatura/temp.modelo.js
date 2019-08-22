const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    temperatura: { type: String, required: true },
    humedad: { type: String, required: true },
    hora: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('temperaturas', schema);