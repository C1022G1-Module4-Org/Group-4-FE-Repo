function selectCustomerTypeForUpdate() {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/customer-type`,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      customerOptionForUpdate(data);
    },
    error: function (error) {
      alert("Lỗi !");
    },
  });
}

function customerOptionForUpdate(customerTypes) {
  let elements = "";
  elements += `<select class="form-control" id="selectCustomerTypeUpdate">`;
  for (let customerType of customerTypes.content) {
    elements += `<option value="${customerType.id}">`;
    elements += customerType.name;
    `</option>`;
  }
  `</select>`;
  $("#customerTypeUpdate").html(elements);
}

function update() {
  let customerId = $("#update-id").val();
  let customerName = $("#update-name").val();
  let customerDateOfBirth = $("#update-dateOfBirth").val();
  let customerGender;
    for (let el of document.getElementsByClassName('update-gender')) {
        if (el.checked) {
            customerGender = el.value;
            break;
        }
    }
  let customerEmail = $("#update-email").val();
  let customerAddress = $("#update-address").val();
  let customerPhoneNumber = $("#update-phoneNumber").val();
  let customerType = $("#selectCustomerTypeUpdate").val();
  updateCustomer(
    customerId,
    customerName,
    customerDateOfBirth,
    customerGender,
    customerEmail,
    customerAddress,
    customerPhoneNumber,
    customerType
  );
}

function updateCustomer(
  customerId,
  customerName,
  customerDateOfBirth,
  customerGender,
  customerEmail,
  customerAddress,
  customerPhoneNumber,
  customerType
) {
  $.ajax({
    type: "PUT",
    url: "http://localhost:8080/api/customer",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    data: JSON.stringify({
      customerId: customerId,
      customerName: customerName,
      customerDateOfBirth: customerDateOfBirth,
      customerGender: customerGender,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      customerPhoneNumber: customerPhoneNumber,
      customerTypeDTO: { id: customerType },
    }),
    success: function () {
      alert("Chỉnh Sửa thông tin khách hàng Thành Công");
      $("#update").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      getCustomer();
    },
    error: function (error) {
      console.log(error);
      for (let key of Object.keys(error.responseJSON)) {
        if ($(`#error-${key}`)) {
          console.log(key);
          $(`#error-${key}`).text(error.responseJSON[key]);
        }
      }
      alert("Chỉnh Sửa Không Thành Công");
    },
  });
}

function detailCustomer(id) {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/customer/detail/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      selectCustomerTypeForUpdate();
      let element = "";
      let customers = data;
      element = `
                <input type="hidden" id="update-id" value="${customers.customerId}">
                    <div class="form-group">
                        <label for="update-name">Tên khách hàng</label>
                        <input type="text"
                               class="form-control" name="update-name" id="update-name" value="${customers.customerName}">
                               <div class="error-message text-danger" id="error-customerName"></div>
                               </div>  
                      <div class="form-group">
                        <label for="update-dateOfBirth-name">Ngày sinh</label>
                        <input type="date"
                               class="form-control" name="update-dateOfBirth" id="update-dateOfBirth" value="${customers.customerDateOfBirth}">
                    </div>
                    <div class="form-group">
                    <label for="update-gender">Giới tính</label>
                    <input type="radio" value="Nam" name="update-gender" class="update-gender" checked/> Nam
                   <input type="radio" value="Nữ" name="update-gender" class="update-gender"/> Nữ
                     </div>
                    <div class="form-group">
                        <label for="update-email">Email</label>
                        <input type="text"
                               class="form-control" name="update-email" id="update-email"  value="${customers.customerEmail}">
                               <div class="error-message text-danger" id="error-customerEmail"></div>
                               </div>
                    <div class="form-group">
                    <label for="update-address">Địa chỉ</label>
                    <input type="text"
                      class="form-control" name="update-address" id="update-address" value="${customers.customerAddress}">
                      <div class="error-message text-danger" id="error-update-address"></div>
                      </div>
                     <div class="form-group">
                    <label for="update-phoneNumber">Số điện thoại</label>
                    <input type="text"
                      class="form-control" name="update-phoneNumber" id="update-phoneNumber" value="${customers.customerPhoneNumber}">
                      <div class="error-message text-danger" id="error-customerPhoneNumber"></div>
                      </div>
                      <div class="form-group">
                   <label for="customerType">Loại khách </label>
                   <div id="customerTypeUpdate"></div>
                     </div>
                           <div class="modal-footer text-center flex items-center gap-2">
        <button type="button" id="btnSave" class="btn btn-success" onclick="update()">Lưu</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy bỏ</a>
      </div>
                      `;
      $("#update-form").html(element);
      let customerGender = `[value="${customers.customerGender}"]`;
            $('input[name="update-gender"]').filter(customerGender).attr('checked', true);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
