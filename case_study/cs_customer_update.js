function selectCustomerTypeForUpdate(){

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/customer-type`,
        headers: {
            "Content-Type": "application/json",
        },
        success:function(data){
            customerOptionForUpdate(data)
        },
        Error:function(error){
            console.log(error)
        },
    })
}
function customerOptionForUpdate(customerTypes){

    let elements="";
    elements+=
        `<select class="form-control" id="selectCustomerTypeUpdate">`
    for(let customerType of customerTypes.content){
        elements+= `<option value="${customerType.customerTypeId}">`
        elements+= customerType.customerTypeName;
        `</option>`
    }
    `</select>`;
    $("#customerTypeUpdate").html(elements);
}

function update() {
    debugger
    let customerId = $("#update-id").val();
    let customerName = $("#update-name").val();
    let customerDateOfBirth = $("#update-dateOfBirth").val();
    let customerGender = $("#update-gender").val();
    let customerEmail = $("#update-email").val();
    let customerAddress = $("#update-address").val();
    let customerPhoneNumber = $("#update-phoneNumber").val();
    let customerType = $("#selectCustomerTypeUpdate").val();
    updateCustomer(customerId, customerName, customerDateOfBirth, customerGender, customerEmail, customerAddress, customerPhoneNumber, customerType);
};

function updateCustomer(customerId, customerName, customerDateOfBirth, customerGender, customerEmail, customerAddress, customerPhoneNumber, customerType) {
debugger
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/customer",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            customerId: customerId,
            customerName: customerName,
            customerDateOfBirth: customerDateOfBirth,
            customerGender: customerGender,
            customerEmail: customerEmail,
            customerAddress: customerAddress,
            customerPhoneNumber: customerPhoneNumber,
            customerTypeDTO: {customerTypeId: customerType},
        }),
        success: function () {
            alert("Chỉnh Sửa thông tin khách hàng Thành Công")
            $("#update").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            getCustomer();
        },
        error: function () {
            alert("Chỉnh Sửa Không Thành Công")
        },
    })
}

function detailCustomer(id) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/customer/detail/${id}`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {


                    selectCustomerTypeForUpdate()
                    let element = "";
                    let customers = data;;
                    console.log(data)
                    element = `
                <input type="hidden" id="update-id" value="${customers.customerId}">
                    <div class="form-group">
                        <label for="update-name">Tên khách hàng</label>
                        <input type="text"
                               class="form-control" name="update-name" id="update-name" value="${customers.customerName}">
                    </div>  
                      <div class="form-group">
                        <label for="update-dateOfBirth-name">Tên khách hàng</label>
                        <input type="text"
                               class="form-control" name="update-dateOfBirth" id="update-dateOfBirth" value="${customers.customerDateOfBirth}">
                    </div>
                    <div class="form-group">
                    <label for="update-gender">Giới tính</label>
                    <input type="text"
                           class="form-control" name="update-gender" id="update-gender" value="${customers.customerGender}">
                     </div>
                    <div class="form-group">
                        <label for="update-email">Email</label>
                        <input type="text"
                               class="form-control" name="update-email" id="update-email"  value="${customers.customerEmail}">
                    </div>
                    <div class="form-group">
                    <label for="update-address">Địa chỉ</label>
                    <input type="text"
                      class="form-control" name="update-address" id="update-address" value="${customers.customerAddress}">
                  </div>
                     <div class="form-group">
                    <label for="update-phoneNumber">Địa chỉ</label>
                    <input type="text"
                      class="form-control" name="update-phoneNumber" id="update-phoneNumber" value="${customers.customerPhoneNumber}">
                  </div>
                      <div class="form-group">
                   <label for="customerType">Loại khách </label>
                   <div id="customerTypeUpdate"></div>
                     </div>
                           <div class="modal-footer text-center flex items-center gap-2">
        <button type="button" id="btnSave" class="btn btn-success" onclick="update()">Lưu</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy bỏ</a>
      </div>
                      `
                    console.log(element)
                    $("#update-form").html(element);
                },
                error: function (error) {
                    console.log(error);
                }
            });


}