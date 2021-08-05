const express = require('express')
const cors = require('cors')
const port = 4004

const messageCtrl = require('./controllers/messageController')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/messages', messageCtrl.createMessage)

app.listen(port, () => console.log('Why do we fall, Bruce? So that we can learn to pick our server back up.'))