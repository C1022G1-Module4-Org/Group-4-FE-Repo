function renderTeaList (coffeeList) {
    
    let elements = "";
    for (let coffee of coffeeList) {
        elements +=
        `
        <div class="col-lg-4 col-md-2 col-sm-1 mb-5 text-center">
        <img
          width="112"
          height="180"
          src="${coffee.imgURL}"
          alt=""
        />
        <h2>${coffee.name}</h2>
        <p class="fs-4">${coffee.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</p>
        <button type="button" class="btn btn-success">Chọn</button>
      </div>
        `
    }
    $("#tea-list").html(elements);
}

function getTeaList () {
    
    $.ajax({
        type: "get",
        url: `http://localhost:8080/product-for-customer?name=${"Cà Phê"}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            renderTeaList(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(document).ready(function () {
    getTeaList();
})