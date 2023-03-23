function login() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        url: 'http://localhost:8080/api/auth/login',
        type: 'POST',
        data: JSON.stringify({
            usernameOrEmail: username,
            password: password
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            // Lưu token vào local storage
            localStorage.setItem('token', data.accessToken);
            alert("Đăng nhập thành công")

            // Chuyển hướng sang trang khác nếu cần thiết
            window.location.href = 'cs_product.html';
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Đăng nhập thất bại")
            console.log(xhr.responseText);
        }
    });
};

function register () {
    let username = $('#username-register').val();
    let password = $('#password-register').val();
    let email = $('#email-register').val();
    let fullname = $('#fullname-register').val();

    $.ajax ({
        url: `http://localhost:8080/api/auth/register`,
        type: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name: fullname,
            username: username,
            email: email,
            password: password
        }),
        success: function (data) {
            alert("Đăng ký thành công")
            console.log(data);
        },
        error: function (error) {
            if (error.status === 400) {
                alert(error.responseJSON.message);
            } else {
                console.log("Lỗi đăng ký.");
            }
        }
    });
};