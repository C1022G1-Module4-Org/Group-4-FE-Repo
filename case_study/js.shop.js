//phân trangggg
function movePage(page) {
  showList(page);
}

function renderPage(branchList) {
  let pageable = "";
  if (branchList.number <= branchList.totalPages - 1 && branchList.number > 0) {
    pageable += `
    <button class="page-item btn btn-dark" 
    onclick="movePage(${branchList.number - 1})">
    <i class="ti-angle-left"></i>
    </button>
    `;
  }
  for (let i = 1; i <= branchList.totalPages; i++) {
    let pageItem = $(`<button class="page-item number btn btn-dark"
                      onclick="movePage(${i - 1})">
                      ${i}
                      </button>`);
    if (i === branchList.number + 1) {
      pageItem.addClass("active");
    } else {
      pageItem.removeClass("active");
    }
    pageable += pageItem.prop("outerHTML");
  }

  if (branchList.number >= 0 && branchList.number < branchList.totalPages - 1) {
    pageable += `
    <button class="page-item btn btn-dark" 
    onclick="movePage(${branchList.number + 1})">
    <i class="ti-angle-right"></i>
    </button>
    `;
  }
  $("#pagination").html(pageable);
}

//showList
function getBranchIdAndName(id, name) {
  document.getElementById("deleteId").value = id;
  document.getElementById("deleteName").innerText =
    "Bạn có muốn xóa chi nhánh " + name + "?";
}
function showList(page) {
  let search = $("#search").val();
  // debugger
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `http://localhost:8080/branch?name=${search}&page=${page ? page : 0}`,
    success: function (data) {
      renderPage(data);
      data = data.content;
      let contents = "";
      let stt = 1;
      for (let i = 0; i < data.length; i++) {
        contents += `<tr>`;
        contents += `<td>${stt++}`;
        contents += `<td>${data[i].name}`;
        contents += `<td>${data[i].email}`;
        contents += `<td>${data[i].phone}`;
        contents += `<td>${data[i].address}`;
        contents += `<td>
                             
              <button type="button"
                class="btn btn-danger"
                data-toggle="modal" data-target="#exampleModal"
                onclick="getBranchIdAndName(${data[i].id}, '${data[i].name}')">
                <i class="fas fa-trash-alt"></i>
              </button>
                                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"
                                            id="show-emp" data-toggle="modal" data-target="#update"
                                            onclick="getBranchInfo(${data[i].id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                               
                           </td>`;
        contents += `</tr>`;
      }
      $("#body").html(contents);
    },
  });
}

$(document).ready(function () {
  showList();
});
delete $("#delete-branch").submit(function (event) {
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

function add() {
  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let address = $("#address").val();
  addBranch(name, email, phone, address);
}

function addBranch(name, email, phone, address) {
  debugger;
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
    error: function (error) {
      for (let key of Object.keys(error.responseJSON)) {
        if ($(`#${key}-error`)) {
          $(`#${key}-error`).text(error.responseJSON[key]);
        }
      }
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
//updateeeeee
function update() {
  let id = $("#update-id").val();
  let name = $("#update-name").val();
  let email = $("#update-email").val();
  let phone = $("#update-phone").val();
  let address = $("#update-address").val();

  updateBranch(id, name, email, phone, address);
}

function updateBranch(id, name, email, phone, address) {
  $.ajax({
    type: "PUT",
    url: `http://localhost:8080/branch/edit/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
      name: name,
      email: email,
      phone: phone,
      address: address,
      coffeeShopDTO: { id: 1 },
    }),
    success: function (data) {
      alert("Sửa chi nhánh thành công!");
      $("#update").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      showList();
    },
    error: function (error) {
      for (let key of Object.keys(error.responseJSON)) {
        if ($(`#error-${key}`)) {
          $(`#error-${key}`).text(error.responseJSON[key]);
        }
      }
      alert("Lỗi khi sửa chi nhánh!");
    },
  });
}

function getBranchInfo(id) {
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    type: "get",
    url: `http://localhost:8080/branch/detail/${id}`,
    success: function (data) {
      let element = "";
      let branch = data;
      element += `
      <div class="form-group">
        <div id="thongbao" class="text-danger" style="text-align: center;"></div>
      </div>
      <div class="form-group">
        <input type="hidden" id="update-id" value="${branch.id}">
      </div>
      <div class="form-group">
        <label for="update-name" class="control-label col-xs-3">Tên chi nhánh</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-name" value="${branch.name}">
          <div class="error-message text-danger" id="error-name"></div>
          </div>
      </div>
      <div class="form-group">
       <label for="update-email" class="control-label col-xs-3">Email</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-email" value="${branch.email}">
          <div class="error-message text-danger" id="error-email"></div>
          </div>
      </div>
      <div class="form-group">
      <label for="update-phone" class="control-label col-xs-3">Số điện thoại</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-phone" value="${branch.phone}">
          <div class="error-message text-danger" id="error-phone"></div>
          </div>
      <div class="form-group">
        <label for="update-address" class="control-label col-xs-3">Địa chỉ mới</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-address" value="${branch.address}">
          <div class="error-message text-danger" id="error-address"></div>
          </div>
      </div>
                          <div style="border: 0" class="modal-footer col-md-5 text-center">
                        <button type="button" id="btnSave" class="btn btn-success" onclick="update()">Lưu</button>
                        <button class="btn btn-danger" data-dismiss="modal">Hủy bỏ</button>
                    </div>
      `;
      $("#update-form").html(element);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
