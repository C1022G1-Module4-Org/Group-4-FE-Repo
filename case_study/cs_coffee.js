function renderCoffeeList (coffeeList) {
    
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
        <button type="button" class="btn btn-success" onclick= "addOrderCoffee(${coffee.id})">Chọn</button>
      </div>
        `
    }
    $("#tea-list").html(elements);
}

function getCoffeeList () {
    
    $.ajax({
        type: "get",
        url: `http://localhost:8080/product-for-customer?name=${"Cà Phê"}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
          renderCoffeeList(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(document).ready(function () {
  getCoffeeList();
})

function addOrderCoffee(coffeeId) {
    $.ajax({
      type: "post",
      url: `http://localhost:8080/order-detail`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        quantity: 1,
        coffeeShopDTO: { id: 1 },
        productDTO: {id:coffeeId},
        orderDTO: {id: 1},
        totalMoney: 0
      }),
      success: function (data) {
        alert("Thêm sản phẩm vào giỏ hàng thành công")
      },
      error: function (error) {
        alert("Không thể thêm sản phẩm này vào giỏ hàng")
      }
    });
}