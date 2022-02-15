const socket = io('/');

let user = null;
let date = new Date();


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

        list_messages += `<li class="${color}">

                             <div class="msg_user">
                                <p><strong>${data.user}: </strong>${data.msg}</p>
                             </div>

                             <div class="msg_time">
                                <p>${data.hours}</p>
                                <p class="msg_date">${data.date}</p>
                             </div>

                          </li>`
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
        if (input_message.value != '') {
            socket.emit('new_message', { user: user, msg: input_message.value, hours: getHours(), date: getDate() });
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


function getDate(){
    let day = date.getDate();
    let mounth = date.getMonth() + 1;

    if(mounth < 10){
        mounth = '0' + mounth;
    }

    if(day < 10){
        day = '0' + day;
    }

    return day + '/' + mounth;
};

function getHours(){
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    };

    return hours + ':' + minutes;
};