$(document).ready(function () {
  var i = 1;
  $("#btnSave").click(function () {
    $("#addfood").modal("hide");
    $("#addfood").find("form");
    return true;
  });
  // $(".btn-cancel").click(function () {
  //   $("#update").find("form").trigger("reset");
  // });
  $("table").on("click", ".trash", function (e) {
    $(this).closest("tr").remove();
  });
  $("table").on("click", ".edit", function (e) {
    $("#update").modal("show");
    // $tr = $(this).closest("tr");
    // var data = $tr
    //   .children("td")
    //   .map(function () {
    //     return $(this).text();
    //   })
    //   .get();
    // $("#idup").val(data[0]);
    // $("#nameup").val(data[1]);
    // $("#dmup").val(data[2]);
    // $("#gia").val(data[3]);
    // $("#thumbimage").val(data[4]);
    // $("#motaup").val(data[5]);
  });
});
