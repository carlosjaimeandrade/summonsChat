const Sequelize = require('sequelize')
const connection = require('../database/database')
const Chat = require('./Chat')

const Msg = connection.define('msg', {
    msg: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

Chat.hasMany(Msg)

/* Msg.sync({ force: true }) */

module.exports = Msg;