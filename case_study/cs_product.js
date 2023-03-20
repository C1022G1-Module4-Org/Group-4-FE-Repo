// pagination
function movePage(page) {
  getProductList(page);
}

function renderPage(productList) {
  let pageable = "";
  if (
    productList.number == productList.totalPages - 1 &&
    productList.number > 0
  ) {
    pageable += `
    <button class="page-item btn btn-dark" 
    onclick="movePage(${productList.number - 1})">
    <i class="ti-angle-left"></i>
    </button>
    `;
  }
  for (let i = 1; i <= productList.totalPages; i++) {
    let pageItem = $(`<button class="page-item number btn btn-dark"
                      onclick="movePage(${i - 1})">
                      ${i}
                      </button>`);
    if (i === productList.number + 1) {
      pageItem.addClass("active");
    } else {
      pageItem.removeClass("active");
    }
    pageable += pageItem.prop("outerHTML");
  }

  if (productList.number == 0 && productList.number < productList.totalPages) {
    pageable += `
    <button class="page-item btn btn-dark" 
    onclick="movePage(${productList.number + 1})">
    <i class="ti-angle-right"></i>
    </button>
    `;
  }
  $("#pagination").html(pageable);
}

function getProductIdAndName(id, name) {
  document.getElementById("deleteId").value = id;
  document.getElementById("deleteName").innerText =
    "Bạn có muốn xóa sản phẩm " + name + "?";
}

// list
function renderProductList(productList) {
  let elements = "";
  let stt = 1;

  for (let product of productList.content) {
    elements += `<tr>
          <td>${stt++}</td>
          <td>${product.name}</td>
          <td><img src="${product.imgURL}" alt="" width="100px;"></td>
          <td>${product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</td>
          <td>${product.productTypeDTO.name}</td>
          <td>
              <button type="button"
                class="btn btn-danger"
                data-toggle="modal" data-target="#exampleModal"
                onclick="getProductIdAndName(${product.id}, '${product.name}')">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" 
                id="show-emp" data-toggle="modal" data-target="#update"
                onclick="getProductInfo(${product.id})">
                <i class="fas fa-edit"></i>
            </button>
          </td>
          </tr>`;
  }
  $("#list-product").html(elements);
}

function getProductList(page) {
  let search = $("#search").val();
  $.ajax({
    type: "get",
    url: `http://localhost:8080/product?name=${search}&page=${
      page ? page : "0"
    }`,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      renderProductList(data);
      renderPage(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  getProductList();
});

// delete
$("#delete-product").submit(function (event) {
  event.preventDefault();
  let id = $("#deleteId").val();
  deleteProduct(id);
});

function deleteProduct(id) {
  $.ajax({
    type: "delete",
    url: `http://localhost:8080/product/${id}`,
    success: function (data) {
      console.log("Xóa thành công");
      $("#exampleModal").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      getProductList();
    },
    error: function (error) {
      console.log("Lỗi, không xóa được");
    },
  });
}

// add
$("#add-product").submit(function (event) {
  debugger;
  event.preventDefault();
  let name = $("#name").val();
  let price = $("#price").val();
  let imgURL = $("#imgURL").val();
  let productTypeDTO = $("#product-type").val();
  addProduct(name, price, imgURL, productTypeDTO);
});

function addProduct(name, price, imgURL, productTypeDTO) {
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url: `http://localhost:8080/product`,
    type: "post",
    data: JSON.stringify({
      name: name,
      price: price,
      imgURL: imgURL,
      productTypeDTO: { id: productTypeDTO },
    }),
    success: function (data) {
      alert("Thêm sản phẩm thành công!");
      $("#addfood").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      getProductList();
    },
    error: function () {
      alert("Lỗi khi thêm sản phẩm!");
    },
  });
}

function getSelectProductTypeList() {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/product-type`,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      showProductTypeSelectOption(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function showProductTypeSelectOption(productTypes) {
  let element = "";
  element += `
  <select class="form-control" id="product-type" name="product-type">`;

  for (let productType of productTypes) {
    element += `<option value="${productType.id}">`;
    element += productType.name;
    `</option>`;
  }

  `</select>`;
  $("#productTypeDTO").html(element);
  $("#product-typeDTO").html(element);
}

$(document).ready(function () {
  getSelectProductTypeList();
});

// update
$("#update-performing").submit(function(event){
  event.preventDefault();
  let id = $("#update-id").val();
  let name = $("#update-name").val();
  let price = $("#update-price").val();
  let imgURL = $("#update-imgURL").val();
  let productTypeDTO = $("#product-type").val();
  updateProduct(id, name, price, imgURL, productTypeDTO);
})

function updateProduct(id, name, price, imgURL, productTypeDTO) {
  debugger
  $.ajax ({
    type: "PUT",
    url: `http://localhost:8080/product/edit/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
      name: name,
      price: price,
      imgURL: imgURL,
      productTypeDTO: { id: productTypeDTO },
    }),
    success: function (data) {
      alert("Sửa sản phẩm thành công!");
      $("#update").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      getProductList();
    },
    error: function () {
      alert("Lỗi khi sửa sản phẩm!");
    },
  })
}

function getProductInfo(id) {
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    type: "get",
    url: `http://localhost:8080/product/detail/${id}`,
    success: function (data) {
      getSelectProductTypeList();
      let element = "";
      let product = data;
      element += 
      `
      
      <div class="form-group">
        <div id="thongbao" class="text-danger" style="text-align: center;"></div>
      </div>
      <div class="form-group">
        <input type="hidden" id="update-id" value="${product.id}">
      </div>
      <div class="form-group">
        <label for="update-name" class="control-label col-xs-3">Tên món ăn</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-name" value="${product.name}">
        </div>
      </div>
      <div class="form-group">
        <label for="update-price" class="control-label col-xs-3">Giá bán</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="update-price" value="${product.price}">
        </div>
      </div>
      <div class="form-group">
        <label for="update-imgURL" class="control-label col-xs-3">Ảnh sản phẩm</label>
        <div class="col-md-12">
          <input required type="text" class="form-control" id="update-imgURL" name="update-imgURL" value="${product.imgURL}">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Danh mục</label>
        <div class="col-md-12" id="product-typeDTO">
        </div>
      </div>
      <div class="modal-footer text-center flex items-center gap-2">
        <button type="submit" id="btnSave" class="btn btn-success">Lưu</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy bỏ</a>
      </div>
      `
      $("#update-performing").html(element);
    },
    error: function(error) {
      console.log(error);
    }
  })
}

