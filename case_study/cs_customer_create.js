// $("#addCustomer").submit(function(event){
//     debugger
//     event.preventDefault()
//     let customerName=$("#customerName").val();
//     let customerDateOfBirth=$("#customerDateOfBirth").val();
//     let customerGender=$("#customerGender").val();
//     let customerEmail=$("#customerEmail").val();
//     let customerAddress=$("#customerAddress").val();
//     let customerPhoneNumber=$("#customerPhoneNumber").val();
//     let customerTypeName=$("#selectCustomerType").val();
//     createCustomer(customerName,customerDateOfBirth,customerGender,customerEmail,customerAddress,customerPhoneNumber, customerTypeName);
// })
// function createCustomer(customerName,customerDateOfBirth,customerGender,customerEmail,customerAddress,customerPhoneNumber, customerTypeName){
//     debugger
//     $.ajax({
//         type: "POST",
//         url: `http://localhost:8080/api/customer`,
//         headers: {
//             'Accept':'application/json',
//             'Content-Type': 'application/json'
//         },
//         data:JSON.stringify({
//             customerName:customerName,
//             customerDateOfBirth:customerDateOfBirth,
//             customerGender:customerGender,
//             customerEmail:customerEmail,
//             customerAddress:customerAddress,
//             customerPhoneNumber:customerPhoneNumber,
//             customerTypeName:{id:customerTypeName}
//         }),
//         success:function(data){
//             alert("thêm mới thành công")
//             window.location.replace("customerList.html")
//         },
//         Error:function(){
//             alert("lỗi khi thêm sản phẩm")
//         },
//     })
// }
// function selectCustomer(){
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/customerType`,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         success:function(data){
//             customerOption(data)
//         },
//         Error:function(error){
//             console.log(error)
//         },
//     })
// }
// function customerOption(customerTypes){
//     debugger
//     let elements="";
//     elements+=
//         `<select class="form-control" id="selectCustomerType">`
//     for(let customerType of customerTypes.content){
//         elements+= `<option value="${customerType.customerTypeId}">`
//         elements+=customerType.customerTypeName;
//         `</option>`
//     }
//     `</select>`;
//     $("#customerType").html(elements);
// }
// $(document).ready(function(){
//     selectCustomer();
// })

function createCustomer() {
    let customerName = $('#customerName').val();
    let customerDateOfBirth = $('#customerDateOfBirth').val();
    let customerGender = $('#customerGender').val();
    let customerEmail = $('#customerEmail').val();
    let customerAddress = $('#customerAddress').val();
    let customerPhoneNumber = $('#customerPhoneNumber').val();
    let customerTypeDTO = $("#customer-type").val();
    let customer = {
        customerName: customerName,
        customerDateOfBirth: customerDateOfBirth,
        customerGender: customerGender,
        customerEmail: customerEmail,
        customerPhoneNumber: customerPhoneNumber,
        customerAddress: customerAddress,
        customerTypeDTO: {id: customer-type}
    }
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        url: 'http://localhost:8080/api/customer',
        data: JSON.stringify(customer),
        success: function(data){
            console.log("Thêm mới thành công");
            $("#createCustomer").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            getCustomer();
        }
    });
}

function getSelectCustomerTypeList() {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: `http://localhost:8080/api/customer-type`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            showCustomerTypeSelectOption(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function showCustomerTypeSelectOption(customerTypes) {
    let element = "";
    element += `
  <select class="form-control" id="customer-type" name="customer-type">`;

    for (let customerType of customerTypes) {
        element += `<option value="${customerType.customerTypeId}">`;
        element += customerType.customerTypeName;
        `</option>`;
    }

    `</select>`;
    $("#customerTypeDTO").html(element);
}

$(document).ready(function () {
    getSelectCustomerTypeList();
});