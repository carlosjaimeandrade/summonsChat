const {Op} = require('sequelize')
const User = require('../models/User')
const Chat = require('../models/Chat')

const userHome = async (req, res) => {
    const users = await User.findAll({ where: { id:{ [Op.ne]: req.session.user_id } } })
  
    res.render('user/home',{
        users: users
    })


}

module.exports = {
    userHome
}