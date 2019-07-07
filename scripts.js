
var socket = io('https://whatsapp-socketio-david.herokuapp.com/');

const chat = document.querySelector('#chat');
const form = document.querySelector('#form');
const inputMsg = document.querySelector('input[name=message]');

function renderMessage(message) {

    chat.innerHTML += `
    <div class="balloon ${message.author}">
        <p>${message.message}
            <span class="time-done">
                <span class="time">22:10</span>
                <span class="visualized material-icons">done_all</span>
            </span>
        </p>
    </div>`
}

socket.on('receivedMessage', function (message) {

    author = 'received';

    console.log(message.message)

    var messageObject = {
        author: author,
        message: message.message
    }

    renderMessage(messageObject);
})

socket.on('previousMessages', function (messages) {
    for (message of messages) {
        renderMessage(message);
    }
})


form.addEventListener('submit', event => {
    event.preventDefault();
    var msg = inputMsg.value;
    var author = 'sended'

    if (author.length && msg.length) {
        var messageObject = {
            author: author,
            message: msg
        }

        renderMessage(messageObject)

        socket.emit('sendMessage', messageObject);
    }
})
