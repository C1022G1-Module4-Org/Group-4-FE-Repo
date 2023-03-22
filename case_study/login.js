function login() {
    debugger
    var email = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        url: 'http://localhost:8080/api/auth/login',
        type: 'POST',
        data: JSON.stringify({
            "usernameOrEmail": email,
            "password": password
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            console.log(data.accessToken);
            // Lưu token vào local storage
            localStorage.setItem('token', data.accessToken);

            // Chuyển hướng sang trang khác nếu cần thiết
            window.location.href = 'cs_product.html';
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
}