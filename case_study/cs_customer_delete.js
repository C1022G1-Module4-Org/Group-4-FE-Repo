function deleteCustomerById(id, name) {
  document.getElementById("deleteId").value = id;
  document.getElementById("deleteName").innerHTML = name;
}

function Delete() {
  let id = $("#deleteId").val();
  deleteCustomer(id);
}

function deleteCustomer(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:8080/api/customer/?id=${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      console.log("Xóa thành công");
      $("#delete").hide();
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      getCustomer();
    },
    error: function (error) {
      console.log("Lỗi, không xóa được");
    },
  });
}
