// function getCustomer() {
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/customer`,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         success: function (data) {
//             renderCustomer(data);
//         },
//         error: function (error) {
//             console.log(error);
//         },
//     });
// }
//
// function renderCustomer(customers) {
//     let elements = "";
//     let count = 1;
//     for (let customer of customers.content) {
//         elements += `
//         <tr class="fs-4">
//             <td>${count++}</td>
//             <td>${customer.customerName}</td>
//             <td>${customer.customerDateOfBirth}</td>
//             <td>${customer.customerGender}</td>
//             <td>${customer.customerEmail}</td>
//             <td>${customer.customerAddress}</td>
//             <td>${customer.customerPhoneNumber}</td>
//             <td>
//                 <button type="button" class="btn btn-outline-info save" data-bs-toggle="modal"
//                                         data-bs-target="#deleteCustomer">
//                                          <i class="fas fa-edit"></i>-->
//                 </button>
//             </td>
//             <td>
//                 <button type="button" class="btn btn-outline-info save" data-bs-toggle="modal"
//                                         data-bs-target="#deleteCustomer">
//                                         <i class="fas fa-trash-alt"></i>
//                 </button>
//             </td>
//         </tr>
//     `;
//     }
//         $("#customerList").html(elements);
// }
//
// $(document).ready(function () {
//     getCustomer();
// });
