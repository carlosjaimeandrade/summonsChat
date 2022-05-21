const Msg = require('../models/Msg')
const Chat = require('../models/Chat')

const create = async (req,res)=>{
    const codigo = req.body.codigo
    const msg = req.body.msg
    
    const chats = await Chat.findAll({ where: { codigo }})
    if(chats){
        chats.forEach(async chat=>{
            await Msg.create({
                chatId: chat.id,
                msg : msg,
                userId: req.session.user_id
            })
        })
    
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
   

}

const msgs = async (req, res)=>{
    const offset = req.params.offset
    const codigo = req.params.codigo

    const from = await Chat.findOne({ where: { userId : req.session.user_id, codigo: codigo  }})

    const msgs = await Msg.findAll({offset: parseInt(offset), where: { chatId: from.id }})

    res.statusCode = 200;
    res.json({id: req.session.user_id, msgs})
}


module.exports = {
    create,
    msgs
}