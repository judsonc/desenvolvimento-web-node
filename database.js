const mongoose = require('mongoose')

mongoose.connection.on('error', err => console.error(`MongoDB: erro na conexão - ${err.stack}`))

module.exports = mongoose.connect(
    'mongodb://trader:tr4d3r@ds217898.mlab.com:17898/cursolii',
    { useNewUrlParser: true }
)