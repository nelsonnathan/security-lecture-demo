const bcrypt = require('bcryptjs')

const chats = [
    // {
    //     pin: 1332,
    //     messages: ['yo', 'hey']
    // }
]

module.exports = {
    createMessage: (req, res) => {
        const {pin, message} = req.body
        console.log(req.body)

        for (let i = 0; i < chats.length; i++) {
            const existing = bcrypt.compareSync(pin, chats[i].pinHash)

            if (existing) {
                chats[i].messages.push(message)
                const chatObjToSendBack = {... chats[i]}
                delete chatObjToSendBack.pinHash
                console.log(chats)
                return res.status(200).send(chatObjToSendBack)
            }
        }

        const salt = bcrypt.genSaltSync(5)
        const pinHash = bcrypt.hashSync(pin, salt)

        const chatObj = {
            pinHash: pinHash,
            messages: [message]
           }
        chats.push(chatObj)

        const chatObjToSendBack = {...chatObj}
        delete chatObjToSendBack.pinHash
        console.log(chats)
        console.log('New Chat Obj: ', chatObjToSendBack)
        res.status(200).send(chatObjToSendBack)
    }
}