function renderTeaList (teaList) {
    
    let elements = "";
    for (let tea of teaList) {
        elements +=
        `
        <div class="col-lg-4 col-md-2 col-sm-1 mb-5 text-center">
        <img
          width="112"
          height="180"
          src="${tea.imgURL}"
          alt=""
        />
        <h2>${tea.name}</h2>
        <p class="fs-4">${tea.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</p>
        <button type="button" class="btn btn-success" onclick= "addOrderTea(${tea.id})">Chọn</button>
      </div>
        `
    }
    $("#tea-list").html(elements);
}

function getTeaList () {
    
    $.ajax({
        type: "get",
        url: `http://localhost:8080/product-for-customer?name=${"Trà"}`,
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
};

$(document).ready(function () {
    getTeaList();
});

function addOrderTea(teaId) {
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
        productDTO: {id:teaId},
        orderDTO: {id: 2},
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