const socket = io();

let username;
let textarea = document.querySelector('#inputMsg')
let msgArea = document.querySelector('.msgArea')

do {
    username = prompt('Please enter your username: ')
} while (!username)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMsg(e.target.value);
    }
})


function sendMsg(msg) {
    let data = {
        user: username,
        message: msg
    }

    // append to chat
    appendMsg(data, 'outgoing');
}


function appendMsg(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'msg');
    let markup = `<h5>${msg.user}</h5><p>${msg.message}</p>`;
    mainDiv.innerHTML = markup;
    msgArea.appendChild(mainDiv);
}