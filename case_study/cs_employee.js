function movePage(nextPage) {
    loadList(nextPage);
}

function renderPage(employeeList) {
    let page = "";
    if (employeeList.number == employeeList.totalPages - 1 && employeeList.number > 0) {
        page += `
    <button class="page-item btn btn-primary" 
    onclick="movePage(${employeeList.number - 1})">
    <i class="ti-angle-left"></i>
    </button>
    `
    }
    for (let i = 1; i <= employeeList.totalPages; i++) {
        let pageItem = $(`<button class="page-item number btn btn-primary"
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
    <button class="page-item btn btn-primary" 
    onclick="movePage(${employeeList.number + 1})">
    <i class="ti-angle-right"></i>
    </button>
    `
    }
    $("#paging").html(page);
}

function renderEmployee(employee) {
    let element = "";
    for (let employees of employee) {
        let gender = employees.gender;
        if (gender) {
            gender = "Nam";
        } else {
            gender = "Nữ";
        }
        element += `
       <tr>
        <td>${employees.id}</td>
        <td>${employees.name}</td>
        <td>${gender}</td>
        <td>${employees.positionDTO.position}</td>
        <td>${employees.email}</td>
        <td><button onclick=getEmployee('${employees.id}','${employees.name}') id="deleteId" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"
        id="show-emp" data-toggle="modal" data-target="#update">
        <i class="fas fa-edit"></i>
        </button></td>
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



