$(document).ready(function(){
	var i = 1;
    
    // function readURL(input, thumbimage) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //         $("#thumbimage").attr('src', e.target.result);
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    //     else { // Sử dụng cho IE
    //         $("#thumbimage").attr('src', input.value);
    
    //     }$("#thumbimage").show();
    // }
	$("#btnSave").click(function(){
        var ma = $("#txtMa").val();
        var ten = $("#txtName").val();
        var dm =  $("#txtDm").val();
        var anh = $("#uploadfile").val().substring();
        var gia = $("#txtGia").val();
        var mota = $("#txtMota").val();
        var item = `<button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="myFunction(this)">
                    <i class="fas fa-trash-alt"></i>'
                </button>
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"><i class="fas fa-edit"></i></button>`;
		var them = "<tr><td>" + ma +"</td><td>" + ten +"</td><td>"+dm +"</td><td>" + gia +"</td><td>" + anh +"</td><td>" + mota+"</td><td>"+ item+"</td></tr>";
		$("table tbody").append(them);
		$("#addfood").modal("hide");
        $("#addfood").find('form').trigger('reset');
		return true;
	});
    $(".btn-cancel").click(function(){
        $("#addfood").find('form').trigger('reset');
    });
    $('table').on('click', '.trash', function(e){
        $(this).closest('tr').remove()
    });
    $('table').on('click', '.edit', function(e){
        $('#update').modal('show');
        $tr =$(this).closest('tr');
        var data= $tr.children("td").map(function(){
          return $(this).text();
        }).get();
        $('#idup').val(data[0]);
        $('#nameup').val(data[1]);
        $('#dmup').val(data[2]);
        $('#gia').val(data[3]);
        $('#thumbimage').val(data[4]);
        $('#motaup').val(data[5]);
    });
});