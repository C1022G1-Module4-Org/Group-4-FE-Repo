function movePage(nextPage) {
    loadList(nextPage);
}

function renderPage(employeeList) {
    let page = "";
    if (employeeList.number == employeeList.totalPages - 1 && employeeList.number > 0) {
        page += `
    <button class="page-item btn btn-primary m-1" 
    onclick="movePage(${employeeList.number - 1})">
    <i class="ti-angle-left"></i>
    </button>
    `
    }
    for (let i = 1; i <= employeeList.totalPages; i++) {
        let pageItem = $(`<button class="page-item number btn btn-primary m-1"
                      onclick="movePage(${i - 1})">
                      ${i} 
                      </button>`);
        if (i === employeeList.number + 1) {
            pageItem.addClass("active");
        } else {
            pageItem.removeClass("active");
        }
        page += pageItem.prop('outerHTML');
    }

    if (employeeList.number == 0 && employeeList.number < employeeList.totalPages) {
        page += `
    <button class="page-item btn btn-primary m-1"  
    onclick="movePage(${employeeList.number + 1})">
    <i class="ti-angle-right"></i>
    </button>
    `
    }
    $("#paging").html(page);
}

function renderEmployee(employee) {
    let element = "";
    let stt = 1;
    for (let employees of employee) {
        let gender = employees.gender;
        if (gender) {
            gender = "Nam";
        } else {
            gender = "Nữ";
        }
        element += `
       <tr>
        <td>${stt++}</td>
        <td>${employees.name}</td>
        <td>${gender}</td>
        <td>${employees.positionDTO.position}</td>
        <td>${employees.email}</td>
        <td><button onclick=getEmployee('${employees.id}','${employees.name}') id="deleteId" type="button" 
        class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fas fa-trash-alt"></i>
        </button>
        </td>
        <td>
         <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" 
                id="show-emp" data-toggle="modal" data-target="#update"
                onclick="getInfo(${employees.id})">
                <i class="fas fa-edit"></i>
            </button>
        </td>
       </tr>`;
    }
    $("#listEmployee").html(element);
}

function loadList(page) {
    let search = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/employee?page=${page ? page : "0"}&search=` + search,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            renderEmployee(data.content);
            renderPage(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

$(document).ready(function () {
    loadList()
});

// delete
function deleteEmployee(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/employee/` + id,
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            loadList(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

const getEmployee = (id, name) => {
    $("#deleteEmployee").click(() => {
        deleteEmployee(id);
    });
    $("#employeeDelete").html(name);
}

// add
function addEmployee(name, gender, positionDTO, email, dateOfBirth, phoneNumber, address) {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/employee/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name: name,
            positionDTO: {
                id: positionDTO
            },
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email,
            address: address,
            phoneNumber: phoneNumber
        }),
        success: function () {
            alert("Thêm nhân viên thành công!");
            $("#exampleModal1").hide();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
            getSelectPosition();
        },
        error: function () {
            alert("Lỗi khi thêm nhân viên!");
        }
    })
}

function add() {
    let name = $("#name").val();
    var gender = $('input[name="gender"]:checked').val();
    let email = $("#email").val();
    let positionDTO = $("#position").val();
    // name, gender, positionDTO, email, dateOfBirth, phoneNumber, address
    let dateOfBirth = $("#dateOfBirth").val();
    let phoneNumber = $("#phoneNumber").val();
    let address = $("#address").val();
    addEmployee(name, gender, positionDTO, email, dateOfBirth, phoneNumber, address);
};

function getSelectPosition(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/position`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            showPositionSelectOption(data);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getSelectPositionForUpdate(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/position`,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            showPositionSelectOptionUpdate(data, id);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function showPositionSelectOption(position) {
    let element = "";
    element += `
  <select class="form-control" id="position" name="position">`;

    for (let positions of position) {
        element += `<option value="${positions.id}">`;
        element += positions.position;
        `</option>`;
    }

    `</select>`;
    $("#positionDTO").html(element);
}

$(document).ready(function () {
    getSelectPosition();
});

function editEmployee(id, name, gender, positionDTO, email, dateOfBirth, phoneNumber, address) {
    debugger
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/employee/edit/` + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            id: id,
            name: name,
            positionDTO: {
                id: positionDTO
            },
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email,
            address: address,
            phoneNumber: phoneNumber
        }),
        success: function () {
            alert("Sửa thông tin nhân viên thành công!");
            $("#edit1").hide();
            $('body').removeClass("modal-open");
            $(".modal-backdrop").remove();
            loadList();
        },
        error: function () {
            alert("Lỗi khi sửa thông tin nhân viên !!!")
        }
    })
}

$("#update-performing").submit(function () {
    debugger
    let id = $("#update-id").val();
    let name = $("#edit-name").val();
    let gender = $('input[name="edit-gender"]:checked').val();
    let email = $("#edit-email").val();
    let positionDTO = $("#position1").val();
    // name, gender, positionDTO, email, dateOfBirth, phoneNumber, address
    let dateOfBirth = $("#edit-dateOfBirth").val();
    let phoneNumber = $("#edit-phoneNumber").val();
    let address = $("#edit-address").val();
    editEmployee(id, name, gender, positionDTO, email, dateOfBirth, phoneNumber, address);
})

function getInfo(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/employee/info/` + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (data) {
            getSelectPositionForUpdate(id);
            let element = "";
            let employee = data;
            element +=
                `
            <div class="modal-body">
                <div class="form-group">
                    <div id="thongbao1" class="text-danger" style="text-align: center;"></div>
                </div>
                <div class="form-group">
                <input type="hidden" id="update-id" value="${employee.id}">
                </div>
                <div class="form-group">
                    <label for="name" class="control-label col-xs-3">Tên nhân viên<span
                            class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="text" class="form-control" id="edit-name" name="edit-name" value="${employee.name}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label">Chức vụ<span class="span">*</span></label>
                    <div class="col-md-12" id="positionDTO1">
                    </div>
                </div>
                <div class="form-group">
                    <label for="dateOfBirth" class="control-label col-xs-3">Ngày sinh<span class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="date" class="form-control" id="edit-dateOfBirth" name="edit-dateOfBirth" value="${employee.dateOfBirth}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-xs-3">Giới tính<span
                            class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="radio" class="" id="edit-men" name="edit-gender" value="true">
                        <label for="edit-men">Nam</label>
                        <input required type="radio" class="" id="edit-women" name="edit-gender" value="false">
                        <label for="edit-women">Nữ</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-email" class="control-label col-xs-3">Email<span class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="text" class="form-control" id="edit-email" name="edit-email" value="${employee.email}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-phoneNumber" class="control-label col-xs-3">Số điện thoại<span
                            class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="text" class="form-control" id="edit-phoneNumber" name="edit-phoneNumber" value="${employee.phoneNumber}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-address" class="control-label col-xs-3">Địa chỉ<span class="span">*</span></label>
                    <div class="col-md-12">
                        <input required type="text" class="form-control" id="edit-address" name="edit-address" value="${employee.address}">
                    </div>
                </div>
                <div style="border: 0" class="modal-footer col-md-5 text-center">
                    <button type="submit" id="btnEdit" class="btn btn-success">Lưu</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy bỏ</button>
                </div>
            </div>`
            $("#update-performing").html(element);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function showPositionSelectOptionUpdate(positions, id) {
    let element = "";
    let selectPosition = "";
    for (let position of positions) {
        for (let employee of position.employeeSet) {
            if (employee.id === id) {
                selectPosition = position.position;
            }
        }
    }
    element += `
  <select class="form-control" id="position1" name="position1">
 <option value="${id}">${selectPosition}</option>
`
    ;

    for (let position of positions) {
        if (position.position !== selectPosition) {
            element += `<option value="${position.id}">`;
            element += position.position;
            `</option>`;
        }
    }

    `</select>`;
    $("#positionDTO1").html(element);
}

