function add(){
    let customerName=$("#customerName").val();
    let customerDateOfBirth=$("#customerDateOfBirth").val();
    let customerGender=$("#customerGender").val();
    let customerEmail=$("#customerEmail").val();
    let customerAddress=$("#customerAddress").val();
    let customerPhoneNumber=$("#customerPhoneNumber").val();
    let customerType=$("#selectCustomerType").val();
    createCustomer(customerName,customerDateOfBirth,customerGender,customerEmail,customerAddress,customerPhoneNumber, customerType);
};

function createCustomer(customerName,customerDateOfBirth,customerGender,customerEmail,customerAddress,customerPhoneNumber, customerType){
    debugger
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/customer`,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            customerName:customerName,
            customerDateOfBirth:customerDateOfBirth,
            customerGender:customerGender,
            customerEmail:customerEmail,
            customerAddress:customerAddress,
            customerPhoneNumber:customerPhoneNumber,
            customerTypeDTO : {customerTypeId:customerType}
        }),
        success:function(data){
            console.log("Thêm mới thành công");
            $("#createCustomer").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            getCustomer();
        },
        Error:function(error){
            alert("lỗi khi thêm sản phẩm")
        },
    })
}
function selectCustomerType(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/customer-type`,
        headers: {
            "Content-Type": "application/json",
        },
        success:function(data){
            customerOption(data)
        },
        Error:function(error){
            console.log(error)
        },
    })
}
function customerOption(customerTypes){

    let elements="";
    elements+=
        `<select class="form-control" id="selectCustomerType">`
              for(let customerType of customerTypes.content){
                   elements+= `<option value="${customerType.customerTypeId}">`
                   elements+= customerType.customerTypeName;
                             `</option>`
    }
       `</select>`;
    $("#customerType").html(elements);
}
$(document).ready(function(){
    selectCustomerType();
})