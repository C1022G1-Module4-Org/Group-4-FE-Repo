function renderFrappeList (frappeList) {
    
    let elements = "";
    for (let frappe of frappeList) {
        elements +=
        `
        <div class="col-lg-4 col-md-2 col-sm-1 mb-5 text-center">
        <img
          width="112"
          height="180"
          src="${frappe.imgURL}"
          alt=""
        />
        <h2>${frappe.name}</h2>
        <p class="fs-4">${frappe.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</p>
        <button type="button" class="btn btn-success" onclick = "addOrderFrappe(${frappe.id})">Chọn</button>
      </div>
        `
    }
    $("#tea-list").html(elements);
}

function getFrappeList () {
    
    $.ajax({
        type: "get",
        url: `http://localhost:8080/product-for-customer?name=${"Đá Xay"}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            renderFrappeList(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(document).ready(function () {
    getFrappeList();
});

function addOrderFrappe(frappeId) {
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
        productDTO: {id:frappeId},
        orderDTO: {id: 4},
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