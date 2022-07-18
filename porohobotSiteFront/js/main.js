
window.onload = () => {

    const code = location.href.split('?code=')[1];

    if (!code) return;

    let sendCode = JSON.stringify({code: code});
    let request = new XMLHttpRequest();
    request.open("POST", `/auth`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let receivedUser = JSON.parse(request.response);
        console.log(receivedUser)   // смотрим ответ сервера
        let navbar = document.getElementById('navbar');
        navbar.innerHTML = `<button id="dashboard" class="navbarbutton main">DASHBOARD</button><div class="user"><div class="main username">${receivedUser.username}#${receivedUser.discriminator}</div><img class="useravatar" src="https://cdn.discordapp.com/avatars/${receivedUser.id}/${receivedUser.avatar}.png?size=60"></div>`
    });
    request.send(sendCode);
};