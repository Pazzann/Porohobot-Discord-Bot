

window.onload = () => {
    const params = new URLSearchParams(window.location.search)

    if (!params.get('code')) return;

    let sendCode = JSON.stringify({code: params.get('code')});
    let request = new XMLHttpRequest();
    request.open("POST", `/auth`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let receivedUser = JSON.parse(request.response);
        window.currUser = receivedUser;
        let navbar = document.getElementById('navbar');
        navbar.innerHTML = `<button id="dashboard" class="navbarbutton main">DASHBOARD</button><div class="user logout" id="logoutdiv"><div class="main username">${receivedUser.username}</div><img class="useravatar" src="https://cdn.discordapp.com/avatars/${receivedUser.id}/${receivedUser.avatar}.png?size=60"></div>`;
        const logoutButton = document.getElementById('logoutdiv');
        logoutButton.onclick = function (e){
            location.href="http://localhost:3000/";
        }
        const dashboard = document.getElementById('dashboard');
    });
    request.send(sendCode);
};