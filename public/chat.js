const socket = io('/');

let user = null;

socket.on('last_messages', (messages) => {

    const screen_messages = document.getElementById('messages');

    let list_messages = '<ul>';
    messages.forEach(data => {
        list_messages += `<li><strong>${data.user}</strong>: ${data.msg}</li>`
    });
    list_messages += '</ul>';

    screen_messages.innerHTML = list_messages;
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const userForm = document.getElementById('user_form');
    const modal = document.getElementById('modal');
    const container = document.getElementById('container');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let input_message = document.getElementById('message_input');
        socket.emit('new_message', {user: user, msg: input_message.value});
        input_message.value = '';
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let input_user = document.getElementById('user_input');
        
        if(input_user.value === '') {
            return;
        }
        user = input_user.value;
        modal.style.display = 'none';
        container.classList.remove('blur');
    });

});