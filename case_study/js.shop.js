
function getBranchIdAndName(id, name) {
    document.getElementById("deleteId").value = id;
    document.getElementById("deleteName").innerText =
        "Bạn có muốn xóa chi nhánh " + name + "?";
}
function showList() {
    // debugger
    $.ajax({
        type:"GET",
        dataType:"json",
        url:`http://localhost:8080/branch`,
        success: function (data) {
            data=data.content
            let contents = "";
            for (let i = 0; i < data.length; i++) {
                contents += `<tr>`
                contents += `<td>${data[i].id}`
                contents += `<td>${data[i].name}`
                contents += `<td>${data[i].email}`
                contents += `<td>${data[i].phone}`
                contents += `<td>${data[i].address}`
                contents+=`<td>
                             
              <button type="button"
                class="btn btn-danger"
                data-toggle="modal" data-target="#exampleModal"
                onclick="getBranchIdAndName(${data[i].id}, '${data[i].name}')">
                <i class="fas fa-trash-alt"></i>
              </button>
                                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"
                                            id="show-emp" data-toggle="modal" data-target="#update">
                                        <i class="fas fa-edit"></i>
                                    </button>
                               
                           </td>`
                contents += `</tr>`
            }
            $('#body').html(contents)
        }

    });
}

$(document).ready(function () {
    showList();
})
delete
    $("#delete-branch").submit(function (event) {
        debugger
        event.preventDefault();
        let id = $("#deleteId").val();
        deleteBranch(id);
    });

function deleteBranch(id) {
    debugger
    $.ajax({
        type: "delete",
        url: `http://localhost:8080/branch/${id}`,
        dataType: "json",
        success: function (data) {
            console.log("Xóa thành công");
            $("#exampleModal").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            showList();
        },
        error: function (error) {
            console.log("Lỗi, không xóa được");
        },
    });
}