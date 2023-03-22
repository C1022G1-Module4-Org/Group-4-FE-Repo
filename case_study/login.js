function login() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        url: 'http://localhost:8080/api/auth/login',
        type: 'POST',
        data: JSON.stringify({
            "usernameOrEmail": username,
            "password": password
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            // Lưu token vào local storage
            localStorage.setItem('token', data.accessToken);

            // Chuyển hướng sang trang khác nếu cần thiết
            window.location.href = 'cs_product.html';
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
};

function register () {
    debugger
    let username = $('#username-register').val();
    let password = $('#password-register').val();
    let email = $('#email-register').val();

    $.ajax ({
        url: `http://localhost:8080/api/auth/register`,
        type: "post",
        dataType: 'json',
        data: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        }),
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
};