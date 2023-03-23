// list
function renderOrderList(orderList) {
  let elements = "";
  let stt = 1;
  var orderDTOMap = {};
  for (var i = 0; i < orderList.length; i++) {
    var orderDTOId = orderList[i].orderDTO.id;
    if (!orderDTOMap[orderDTOId]) {
      orderDTOMap[orderDTOId] = 1;
    } else {
      orderDTOMap[orderDTOId]++;
    }
  }
  let productTypeNameArr = ["Cà Phê", "Trà", "Trà Sữa", "Đá Xay"];
  i = 0;
  for (var orderDTOId in orderDTOMap) {
    elements += `
    
            <button class="mt-3" data-bs-toggle="collapse" data-bs-target="#collapseExample${orderDTOId}">Giỏ hàng ${productTypeNameArr[i]}</button>
            <div class="collapse col-12" id="collapseExample${orderDTOId}">
        `;
    i++;
    for (let order of orderList) {
      if (order.orderDTO.id == orderDTOId) {
        elements += `
    <div >
      <div class="card card-registration card-registration-2" style="border-radius: 15px;">
          <div class="card-body p-0">
              <div class="row g-0">
                  <div class="col-lg-9">
                      <div class="p-5">
                          <hr class="my-4">
                          <div class="row mb-4 d-flex justify-content-between align-items-center">
                              <div class="col-md-2 col-lg-2 col-xl-2">
                                  <img class="card-img-top" src="${order.productDTO.imgURL}" alt="">
                              </div>
                              <div class="col-md-3 col-lg-3 col-xl-3">
                                  <input type= "hidden" id="order-id" value = "${order.id}"> 
                                  <input type= "hidden" id="coffeeShopDTO-id" value = "${order.coffeeShopDTO.id}"> 
                                  <input type= "hidden" id="productDTO-id" value = "${order.productDTO.id}">
                                  <input type= "hidden" id="orderDTO-id" value = "${order.orderDTO.id}">
                                  <div class="card-body">
                                      <h4 class="card-title food-name">${order.productDTO.name}</h4>
                                      <input type="hidden" name=""
                                      value ="${order.productDTO.price}" id="price${order.id}">

                                  </div>
                              </div>
                              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">

                                  <input min="0" class="form-control form-control-sm"
                                         type="number" name="quantity" id="quantity${order.id}" style="width: 60px;" value = "${order.quantity}"
                                         onclick="showTotalMoney(${order.id})">
                              </div>
                              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                  <p class="card-text">Giá: ${order.productDTO.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}</p>
                              </div>
                              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                  <button class="text-danger" type="button" id="clear-quantity" class="text-muted" onclick="deleteOrderDetail(${order.id})">
                                      <i class="fas fa-times"></i></button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 bg-grey">
                      <div class="p-5">
                          <h3 class="fw-bold mb-5 mt-2 pt-1">Thông tin</h3>
                          <hr class="my-4">
                          <div class="d-flex justify-content-between mb-5">
                              <h4 class="card-title food-name">${order.productDTO.name}</h4>
                          </div>

                          <hr class="my-4">
                          <div class="d-flex justify-content-between mb-5">
                              <h5 class="text-uppercase">Tổng tiền</h5>
                              <input type= "hidden" id="total-id${order.id}"> 
                              <h5 id="result${order.id}"></h5>
                          </div>
                          <button type="button" class="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark" onclick="editOrderDetail(${order.id})">Chọn</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
    </div>`;
      }
    }
    elements +=
    `
  </div>
    `
  }
  $("#order-list").html(elements);
}

function getOrderList() {
  
  $.ajax({
    type: "get",
    url: `http://localhost:8080/order-detail`,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      renderOrderList(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  getOrderList();
});

function showTotalMoney(id) {
  let price = document.getElementById(`price${id}`).value;
  let quantity = document.getElementById(`quantity${id}`).value;
  let total = price * quantity;
  document.getElementById(`total-id${id}`).value = total;
  document.getElementById(`result${id}`).innerHTML = total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

// delete

function deleteOrderDetail(id) {
  $.ajax ({
    type: "delete",
    url: `http://localhost:8080/order-detail/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    success: function (data) {
      getOrderList();
      alert("Xóa đơn hàng chi tiết thành công");
    },
    error: function (error) {
      alert("Xóa đơn hàng thất bại");
    }
  });
};


// update
function editOrderDetail(selectedId) {
  let id = $("#order-id").val();
  let quantity = $(`#quantity${selectedId}`).val();
  let coffeeShopDTO = $("#coffeeShopDTO-id").val();
  let productDTO = $("#productDTO-id").val();
  let orderDTO = $("#orderDTO-id").val();
  let totalMoney = $(`#total-id${selectedId}`).val();
  $.ajax ({
    type: "PUT",
    url: `http://localhost:8080/order-detail/edit`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
      quantity: quantity,
      coffeeShopDTO: {id: coffeeShopDTO},
      productDTO: {id: productDTO},
      orderDTO: {id: orderDTO},
      totalMoney: totalMoney
    }),
    success: function (data) {
      alert("Bạn đã lưu thông tin sản phẩm thành công!!!");
      console.log(data);
    },
    error: function(error) {
      alert("Bạn không thể lưu sản phẩm này");
      console.log(error);
    }
  });
};