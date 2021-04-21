let form = document.getElementById('loginForm');
let input = document.getElementById('username');
form.addEventListener('submit', event =>{
    event.preventDefault();
    console.log(input.value);
        $.ajax({
            type: "POST",
            url: "/login/",
            data: {
                login: input.value
            },
            success: () => {
                window.location.href = "/";
            },
        });
});