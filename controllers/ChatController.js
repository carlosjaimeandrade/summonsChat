const {Op} = require('sequelize')
const User = require('../models/User')
const Chat = require('../models/Chat')

const chat = async (req, res) => {
    const name = req.params.name
    const { id } = await User.findOne({ where: { name: name }})
    const users = await User.findAll({ where: { id:{ [Op.ne]: req.session.user_id } }})

    const codigo = id > req.session.user_id ? `${id}${req.session.user_id}` : `${req.session.user_id}${id}`

    const to = await Chat.findOne({ where: { userId : id, codigo: codigo }})
    const from = await Chat.findOne({ where: { userId : req.session.user_id, codigo: codigo  }})

    if(!to) await Chat.create({  userId : id, codigo: codigo  })
    
    if(!from) await Chat.create({  userId : req.session.user_id, codigo: codigo  })

    res.render('user/chat',{
        users: users,
        from: from
    })
}

module.exports = {
    chat
}