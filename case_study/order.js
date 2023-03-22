// list
function renderOrderList(orderList) { 
    let elements = "";
    for (let order of orderList) {
        // for (let product of order.productDTO) {
            elements += `
            <div class="col-12">
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
                                        <div class="card-body">
                                            <h4 class="card-title food-name">${order.productDTO.name}</h4>
                                            <input type="hidden" name="" value="${order.productDTO.price}" id="price">
    
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
    
                                        <input min="0" class="form-control form-control-sm"
                                               type="number" name="quantity" id="quantity" style="width: 60px;"
                                               onclick="showTotalMoney()">
                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <p class="card-text">Giá: ${order.productDTO.price}đ</p>
                                    </div>
                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <span id="clear-quantity" class="text-muted" onclick="clearQuantityValue(${order.id})">
                                            <i class="fas fa-times"></i></span>
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
                                    <h4 id="total"></h4>
                                </div>
    
                                <hr class="my-4">
                                <div class="d-flex justify-content-between mb-5">
                                    <h5 class="text-uppercase">Tổng tiền</h5>
                                    <h5 id="result"></h5>
                                </div>
    
                                <!-- <button type="submit" class="btn btn-dark btn-block btn-lg"
                                        data-mdb-ripple-color="dark">Chọn
                                </button> -->
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
            `
        // }
        $("#order-list").html(elements)
    }

}

function getOrderList() {
    $.ajax ({
        type: "get",
        url: `http://localhost:8080/order-detail`,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            renderOrderList (data)
        },
        error: function (error) {
            console.log(error);
        }
    });
};

$(document).ready(function() {
    getOrderList();
})

// add
function add() {
    $.ajax ({
        type: "post",
        url: `http://localhost:8080/order-detail`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            quantity: 1,
            coffeeShopDTO: {id: 1},

        }),
    })
}

function clearQuantityValue(id) {
    document.getElementById("quantity").value = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("total").innerHTML = "";
}
  function showTotalMoney() {
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    document.getElementById("result").innerHTML = price * quantity + " đ";
    document.getElementById("total").innerHTML = quantity;
}