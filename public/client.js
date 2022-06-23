const socket = io();

let username;
let userTitle = document.querySelector('.userTitle')
let sendMsgBtn = document.querySelector('.sendMsgBtn')
let inputMsg = document.querySelector('#inputMsg')
let msgArea = document.querySelector('.msgArea')

do {
    username = prompt('Please enter your username: ')
    userTitle.innerHTML = "Welcome, " + username;
} while (!username)

inputMsg.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMsg(e.target.value);
    }
})

sendMsgBtn.addEventListener('click', () => {
    sendMsg(document.querySelector('#inputMsg').value);
})


function sendMsg(msg) {
    let data = {
        user: username,
        message: msg.trim()
    }

    // append to chat
    appendMsg(data, 'outgoing');
    scrollToBottom()

    inputMsg.value = '';

    // send to server
    socket.emit('message', data);
}


function appendMsg(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'msg');
    let markup = `<h5>${msg.user}</h5><p>${msg.message}</p>`;
    mainDiv.innerHTML = markup;
    msgArea.appendChild(mainDiv);
}


// recieve message from server

socket.on("message", (msg) => {
    // console.log(msg);
    appendMsg(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight;
}