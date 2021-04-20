let chatForm = document.getElementById('chatForm');
let inputMessage = document.getElementById('input');
let messages = document.getElementById('messages');
let userTab = document.getElementById('connectedUser');

socket.emit('login', '');

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    if (input.value) {
        socket.emit('message', inputMessage.value);
        inputMessage.value = '';
    }
});

socket.on('new-message', msg => {
    let newMsg = document.createElement('li');
    newMsg.textContent = msg;
    messages.appendChild(newMsg);
});
//If we have a new user
socket.on('new-user', username => {
    userTab.insertRow(1);
    userTab.rows[1].insertCell(0);
    userTab.rows[1].cells[0].innerText = username;
});
//If we lost a user
socket.on('lost-user', username => {
    let i = 1;
    let plop = 0;
    if (userTab.rows.length !== 1) {
        do {
            if (userTab.rows[i].cells[0].innerText === username) {
                userTab.rows[i].deleteCell(0);
                userTab.deleteRow(i);
                plop = 1;
            }
            else {
                i++;
            }
        } while (plop === 0);
    }
});