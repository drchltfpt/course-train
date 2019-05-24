const user = require('../db/objects/user.js');
const $ = require('jquery');

async function getUsers() {
    let data = await user.getAllUsers();
    return data;
}

$('#register-button').click(async () => {
    const _fullname = $('#fullname').val();
    const _username = $('#username').val();
    const _password = $('#password').val();
    const _email = $('#email').val();

    const arrayUsers = await getUsers();

    for (i = 0; i < arrayUsers.length; i++) {
        if (_username === arrayUsers[i].username) {
            $("#username-exist").css("display", "inline-block");
            return;
        }

        else if (_email === arrayUsers[i].email) {
            $("#email-exist").css("display", "inline-block");
            return;
        }

    }

    const userObject = {
        username: _username,
        password: _password,
        email: _email,
        fullname: _fullname,
    };

    user.addUsers(userObject);
    console.log("Insert successful!");
    
});

$('#login-button').click(() => {
    ipcRenderer.send('openLogin');
});

$('#username').change(() => {
    console.log("Changed");
});
