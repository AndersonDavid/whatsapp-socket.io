const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '/')))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html');
})


let messages = [];

io.on('connection', socket => {
    console.log(`Um corno entrou, pega a placa ${socket.id}`);

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data);
        console.log(data)
        socket.broadcast.emit('receivedMessage', data)
    })
    
});


http.listen(3000, () => {
    console.log('Listen 3000');
    
})