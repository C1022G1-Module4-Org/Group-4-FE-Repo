function renderMilkTeaList (milkTeaList) {
    
    let elements = "";
    for (let milkTea of milkTeaList) {
        elements +=
        `
        <div class="col-lg-4 col-md-2 col-sm-1 mb-5 text-center">
        <img
          width="112"
          height="180"
          src="${milkTea.imgURL}"
          alt=""
        />
        <h2>${milkTea.name}</h2>
        <p class="fs-4">${milkTea.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</p>
        <button type="button" class="btn btn-success" onclick="addOrderMilkTea(${milkTea.id})">Chọn</button>
      </div>
        `
    }
    $("#tea-list").html(elements);
}

function getMilkTeaList () {
    
    $.ajax({
        type: "get",
        url: `http://localhost:8080/product-for-customer?name=${"Trà Sữa"}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
          renderMilkTeaList(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(document).ready(function () {
    getMilkTeaList();
});

function addOrderMilkTea(milkTeaId) {
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
        productDTO: {id:milkTeaId},
        orderDTO: {id: 3},
        totalMoney: 0
      }),
      success: function (data) {
        alert("Thêm sản phẩm vào giỏ hàng thành công")
      },
      error: function (error) {
        alert("Không thể thêm sản phẩm này vào giỏ hàng")
      }
    });
};