showList();

function showList() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/api/customer",
        success: function (customers) {
            console.log(customers);
            let element = '';
            let count = 1;
            for (let customer of customers) {
                element += `<tr>`
                element += `<th>${count++}</th>`
                element += `<td>${customer.customerName}</td>`
                element += `<td>${customer.customerDateOfBirth}</td>`
                element += `<td>${customer.customerGender}</td>`
                element += `<td>${customer.customerEmail}</td>`
                element += `<td>${customer.customerAddress}</td>`
                element += `<td>${customer.customerPhoneNumber}</td>`
                // element += `<td>${customer.customerType.customerTypeName}</td>`
                element += `<td><button type="button" class="btn btn-outline-info save" data-bs-toggle="modal"
                                        data-bs-target="#deleteCustomer">
                                         <i class="fas fa-edit"></i>-->
                                </button>
                            </td>`
                element += `<td><button type="button" class="btn btn-outline-info save" data-bs-toggle="modal"
                                        data-bs-target="#deleteCustomer">
                                        <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>`
                element += `</tr>`;
            }
            $('#customerList').html(element);
        }
    });
}

// create customer
function createCustomer() {
    let customerName = $('#customerName').val();
    let customerDateOfBirth = $('#customerDateOfBirth').val();
    let customerGender = $('#customerGender').val();
    let customerEmail = $('#customerEmail').val();
    let customerAddress = $('#customerAddress').val();
    let customerPhoneNumber = $('#customerPhoneNumber').val();
    let customer = {
        customerName: customerName,
        customerDateOfBirth: customerDateOfBirth,
        customerGender: customerGender,
        customerEmail: customerEmail,
        customerAddress: customerAddress,
        customerPhoneNumber: customerPhoneNumber,
    }
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        url: 'http://localhost:8080/api/customer/create',
        data: JSON.stringify(customer),
        complete: function (customer) {
            console.log(customer);
            showList();
        }
    });
}

// // function movePage(page) {
// //     renderListCustomer(page);
// // }
// //
// // function renderPage(customerList) {
// //     let pageable = "";
// //
// //     if (customerList.number == customerList.totalPages - 1 && customerList.number > 0) {
// //         pageable += `
// //         <button class="page-item btn btn-dark" onclick="movePage(${customerList.number - 1})">
// //         <i class="ti-angle-left"></i>
// //         </button>
// //         `
// //     }
// //
// //     for (let i = 1; i <= customerList.totalPages; i++) {
// //         pageable += `
// //         <button class="page-item btn btn-dark" onclick="movePage(${i - 1})">
// //         ${i}
// //         </button>
// //         `
// //     }
// //
// //     if (customerList.number == 0 && customerList.number < customerList.totalPages) {
// //         pageable += `
// //          <button class="page-item btn btn-dark" onclick="movePage(${customerList.number + 1})">
// //         <i class="ti-angle-right"></i>
// //         </button>
// //         `
// //     }
// //     $("#pagination").html(pageable);
// // }
//
//
// //  customers: danh sách sản phẩm cần được render lên browser
// function renderListCustomer(customers) {
//     let element = '';
//     let count = 1;
//     debugger
//     for (let customer of customers) {
//         // sử dụng `` để thao tác với chuỗi multiple lines
//         element += `<tr>`
//         element += `<td>${count++}</td>`
//         element += `<td>${customer.customerName}</td>`
//         element += `<td>${customer.customerDateOfBirth}</td>`
//         element += `<td>${customer.customerGender}</td>`
//         element += `<td>${customer.customerEmail}</td>`
//         element += `<td>${customer.customerAddress}</td>`
//         element += `<td>${customer.customerPhoneNumber}</td>`
//         // element += `<td>${customer.customerType.customerTypeName}</td>`
//         element += `<td><button type="button" class="btn btn-danger"
//                                  data-toggle="modal" data-target="#exampleModal">
//                                  <i class="fas fa-trash-alt"></i>
//                          </button>
//                     </td>`
//         // element += `<td><button class="btn btn-primary btn-sm edit" type="button" title="Sửa"
//         //                         id="show-emp" data-toggle="modal" data-target="#update">
//         //                         <i class="fas fa-edit"></i>
//         //                  </button>
//         //             </td>`
//         element += `</tr>`;
//     }
//     $('#customerList').html(element);
// }
//
// function loadCustomer(page) {
//     let searchCustomerName = $("#searchCustomerName").val();
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/customer?name=${searchCustomerName}&page=${page ? page : "0"}`,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         success: function (data) {
//             console.log(data);
//             renderListCustomer(data.content);
//             renderPage(data);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     })
// }
//
// // chờ cho document sẵn sàng rồi mới thực hiện phần code bên trong callback (lấy dữ liệu khách hàng)
// $(document).ready(function () {
//     loadCustomer();
// });
//
//
