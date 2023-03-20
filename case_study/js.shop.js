
function getBranchIdAndName(id, name) {
    document.getElementById("deleteId").value = id;
    document.getElementById("deleteName").innerText =
        "Bạn có muốn xóa chi nhánh " + name + "?";
}
function showList() {
    // debugger
    $.ajax({
        type:"GET",
        dataType:"json",
        url:`http://localhost:8080/branch`,
        success: function (data) {
            data=data.content
            let contents = "";
            for (let i = 0; i < data.length; i++) {
                contents += `<tr>`
                contents += `<td>${data[i].id}`
                contents += `<td>${data[i].name}`
                contents += `<td>${data[i].email}`
                contents += `<td>${data[i].phone}`
                contents += `<td>${data[i].address}`
                contents+=`<td>
                             
              <button type="button"
                class="btn btn-danger"
                data-toggle="modal" data-target="#exampleModal"
                onclick="getBranchIdAndName(${data[i].id}, '${data[i].name}')">
                <i class="fas fa-trash-alt"></i>
              </button>
                                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"
                                            id="show-emp" data-toggle="modal" data-target="#update">
                                        <i class="fas fa-edit"></i>
                                    </button>
                               
                           </td>`
                contents += `</tr>`
            }
            $('#body').html(contents)
        }

    });
}

$(document).ready(function () {
    showList();
})
delete
    $("#delete-branch").submit(function (event) {
        event.preventDefault();
        let id = $("#deleteId").val();
        deleteBranch(id);
    });

function deleteBranch(id) {
    // debugger
    $.ajax({
        type: "delete",
        url: `http://localhost:8080/branch/${id}`,
        dataType: "json",
        success: function (data) {
            // debugger
            console.log("Xóa thành công");
            $("#exampleModal").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            showList();
        },
        error: function (error) {
            console.log("Lỗi, không xóa được");
            $("#exampleModal").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            showList();
        },
    });
}
//createeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

function add () {

    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    addBranch(name, email, phone, address);
};


function addBranch(name, email, phone, address) {
    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        url: `http://localhost:8080/branch`,
        type: "post",
        data: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            address: address,
            coffeeShopDTO: { id: 1 },
        }),
        success: function (data) {
            alert("Thêm sản phẩm thành công!");
            $("#addbranch").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            showList();
        },
        error: function () {
            alert("Lỗi khi thêm sản phẩm!");
        },
    });
}

function getSelectCoffeShopList() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/branch-type?name=${""}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            showCoffeShopSelectOption(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}
function showCoffeShopSelectOption(coffeShop) {
    let element = "";
    element += `
  <select class="form-control" id="branch-type" name="branch-type">`;

    for (let coffeShop of coffeShop) {
        element += `<option value="${coffeShop.id}">`;
        element += coffeShop.name;
        `</option>`;
    }

    `</select>`;
    $("#coffeShopDTO").html(element);
    $("#branch-typeDTO").html(element);
}

$(document).ready(function () {
    getSelectCoffeShopList();
});

