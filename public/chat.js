const socket = io('/');

let user = null;

socket.on('last_messages', (messages) => {

    const screen_messages = document.getElementById('messages');



    let list_messages = '<ul>';
    messages.forEach((data, i) => {

        let color = i % 2;
        if (color === 1) {
            color = 'odd';
        } else {
            color = 'even';
        }

        list_messages += `<li class="${color}"> <div class="msg_user"><p><strong>${data.user}: </strong>${data.msg}</p></div><p>${data.hours}</p></li>`
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

        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        };


        let input_message = document.getElementById('message_input');
        if (input_message.value != '') {
            socket.emit('new_message', { user: user, msg: input_message.value, hours: `${hours}:${minutes}` });
        }
        input_message.value = '';
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let input_user = document.getElementById('user_input');

        if (input_user.value === '') {
            return;
        }
        user = input_user.value;
        modal.style.display = 'none';
        container.classList.remove('blur');
    });

});