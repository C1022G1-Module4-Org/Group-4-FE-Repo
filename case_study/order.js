// list
function renderOrderList(orderList) { 
    let elements = "";
    let length = $.unique(orderList.orderDTO.id);
    console.log(length);
    for (let order of orderList) {
            elements += `

            `
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