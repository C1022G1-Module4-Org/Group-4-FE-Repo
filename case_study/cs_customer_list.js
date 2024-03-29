// //phân trang
function movePage(page) {
  getCustomer(page);
}

function renderPage(customerList) {
  let pageable = "";
  if (
    customerList.number <= customerList.totalPages - 1 &&
    customerList.number > 0
  ) {
    pageable += `
                    <button class="page-item btn btn-dark"
                            onclick="movePage(${customerList.number - 1})">
                            <i class="ti-angle-left"></i>
                    </button>
                    `;
  }

  for (let i = 1; i <= customerList.totalPages; i++) {
    let pageItem = $(`<button class="page-item number btn btn-dark"
                                  onclick="movePage(${i - 1})">
                                  ${i}
                          </button>`);
    if (i === customerList.number + 1) {
      pageItem.addClass("active");
    } else {
      pageItem.removeClass("active");
    }
    pageable += pageItem.prop("outerHTML");
  }

  if (
    customerList.number >= 0 &&
    customerList.number < customerList.totalPages - 1
  ) {
    pageable += `
                    <button class="page-item btn btn-dark"
                            onclick="movePage(${customerList.number + 1})">
                            <i class="ti-angle-right"></i>
                    </button>
                    `;
  }
  $("#pagination").html(pageable);
}

function getCustomer(page) {
  let search = $("#search").val();
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/customer?searchCustomerName=${search}&page=${
      page ? page : "0"
    }`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      if (data.content.length == 0) {
        alert("Không tìm thấy khách hàng");
      } else {
        renderCustomer(data);
        renderPage(data);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  getCustomer();
});

function renderCustomer(customers) {
  let elements = "";
  let count = (customers.number - 1)*customers.pageable.pageSize + 6;
  for (let customer of customers.content) {
    elements += `
        <tr>
            <td>${count++}</td>
            <td>${customer.customerName}</td>
            <td>${customer.customerDateOfBirth}</td>
            <td>${customer.customerGender}</td>
            <td>${customer.customerEmail}</td>
            <td>${customer.customerAddress}</td>
            <td>${customer.customerPhoneNumber}</td>
            <td>${customer.customerTypeDTO.name}</td>
            <td>
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" 
                       id="show-emp" data-toggle="modal" data-target="#update" 
                       onclick="detailCustomer(${customer.customerId})">
                       <i class="fas fa-edit"></i>
                     
               </button>

            <button type="button" onclick="deleteCustomerById('${
              customer.customerId
            }','${customer.customerName}')" 
                    class="btn btn-danger" data-toggle="modal" data-target="#delete">
                    <i class="fas fa-trash-alt"></i>
             </button>
            </td>
        </tr>
    `;
  }
  $("#customerList").html(elements);
}
