$("#form").hide();
//
let action = "ADD";
let listStudent = [
  {
    id: "SV001",
    studentName: "Nguyễn Văn A",
    age: 20,
    gen: "Nam",
    birthday: "",
    address: "",
    place: "",
  },
  {
    id: "SV002",
    studentName: "Nguyễn Văn B",
    age: 21,
    gen: "Nam",
    birthday: "",
    address: "",
    place: "",
  },
  {
    id: "SV003",
    studentName: "Nguyễn Văn C",
    age: 19,
    gen: "Nữ",
    birthday: "",
    address: "",
    place: "",
  },
];
// hiển thị danh sách bằng jquery
function displayList(arr) {
  sort(arr);
  let data = "";
  for (let i = 0; i < arr.length; i++) {
    data += `<tr>
    <td>${i + 1}</td>
    <td>${arr[i].id}</td>
    <td>${arr[i].studentName}</td>
    <td>${arr[i].age}</td>
    <td>${arr[i].gen}</td>
    <td>
      <div class="template-demo">
        <button onclick="handleDetail('${
          arr[i].id
        }')" type="button" class="btn btn-danger btn-icon-text">
          Xem
        </button>
        <button onclick="handleEdit('${
          arr[i].id
        }')" type="button" class="btn btn-warning btn-icon-text">
          Sửa
        </button>
        <button onclick="deleteStudent('${
          arr[i].id
        }')" type="button" class="btn btn-success btn-icon-text">
          Xóa
        </button>
      </div>
    </td>
  </tr>`;
  }
  $("tbody").html(data);
}

displayList(listStudent);
// thêm mới 1 học sinh
$("#add").click(function () {
  $("#form").show();
  action = "ADD";
  $("#submit").text("Submit");
  clear();
  $("#id").prop("readonly", false);
  $("#studentName").prop("readonly", false);
  $("#age").prop("readonly", false);
  $("#gen").prop("disabled", false);
  $("#birthday").prop("readonly", false);
  $("#place").prop("disabled", false);
  $("textarea").prop("readonly", false);
  $("#form input:first").focus();
});

$("form").on("submit", function (e) {
  e.preventDefault();
  let id = $("#id").val();
  let studentName = $("#studentName").val();
  let age = $("#age").val();
  let gen = $("#gen").val();
  let birthday = $("#birthday").val();
  let place = $("#place").val();
  let address = $("textarea").val();

  if (action === "ADD") {
    // thêm mới
    let newStudent = { id, studentName, age, gen, birthday, place, address };
    // thêm mới vào mảng liststudent
    listStudent = [...listStudent, newStudent]; // destructoring
  } else if (action === "UPDATE") {
    // update
    let updateStudent = { id, studentName, age, gen, birthday, place, address };
    for (let i = 0; i < listStudent.length; i++) {
      if (listStudent[i].id === id) {
        listStudent[i] = updateStudent;
      }
    }
  } else {
    // detail
    $("#form").hide();
  }
  clear();
  $("#form").hide();
  displayList(listStudent);
});
// reset form
function clear() {
  $("#id").val("");
  $("#studentName").val("");
  $("#age").val("");
  $("#gen").val("");
  $("#birthday").val("");
  $("#place").val("");
  $("textarea").val("");
}
//Xoá theo studentId
function deleteStudent(id) {
  // for (let i = 0; i < listStudent.length; i++) {
  //     if(listStudent[i].id=== id){
  //         // xoá thằng này
  //         listStudent.splice(i,1)
  //     }
  // }
  // listStudent.splice(index,1)
  // phương thức filter
  listStudent = listStudent.filter(function (student) {
    return student.id !== id;
  });
  displayList(listStudent);
}

// update
function handleEdit(idEdit) {
  for (let i = 0; i < listStudent.length; i++) {
    let studentEdit = listStudent[i];
    if (studentEdit.id === idEdit) {
      //đây là phần tử cần sửa
      $("#form").show();
      $("#id").val(studentEdit.id);
      $("#id").prop("readonly", "true");
      $("#studentName").val(studentEdit.studentName);
      $("#age").val(studentEdit.age);
      $("#gen").val(studentEdit.gen);
      $("#birthday").val(studentEdit.birthday);
      $("#place").val(studentEdit.place);
      $("textarea").val(studentEdit.address);
      $("#studentName").prop("readonly", false);
      $("#age").prop("readonly", false);
      $("#gen").prop("disabled", false);
      $("#birthday").prop("readonly", false);
      $("#place").prop("disabled", false);
      $("textarea").prop("readonly", false);
      $("#submit").text("Update");
      action = "UPDATE";
    }
  }
}
function handleDetail(idEdit) {
  for (let i = 0; i < listStudent.length; i++) {
    let studentEdit = listStudent[i];
    if (studentEdit.id === idEdit) {
      //đây là phần tử cần sửa
      $("#form").show();
      $("#id").val(studentEdit.id);
      $("#id").prop("readonly", "true");
      $("#studentName").val(studentEdit.studentName);
      $("#studentName").prop("readonly", "true");
      $("#age").val(studentEdit.age);
      $("#age").prop("readonly", "true");
      $("#gen").val(studentEdit.gen);
      $("#gen").prop("disabled", "true");
      $("#birthday").val(studentEdit.birthday);
      $("#birthday").prop("readonly", "true");
      $("#place").val(studentEdit.place);
      $("#place").prop("disabled", "true");
      $("textarea").val(studentEdit.address);
      $("textarea").prop("readonly", "true");

      $("#submit").text("Close");
      action = "DETAIL";
    }
  }
}
// chức năng tìm kiếm
function searchByName() {
  let value = $("#search").val();
  console.log(value);
  // let arrSearch = listStudent.filter(function (student) {
  //   // match là phương thức của chuỗi trong js
  //   // Nguyễn Văn A / Nguyễn , Ngu
  //   return student.studentName.toLowerCase().match(value.toLowerCase());
  // });

  let arrSearch = [];
  for (let i = 0; i < listStudent.length; i++) {
    if (listStudent[i].studentName.toLowerCase().match(value.toLowerCase())) {
      arrSearch.push(listStudent[i]);
    }
  }
  displayList(arrSearch);
}
function sort(list) {
  let value = $("#sort").val();
  let arr = value.split("-");
  console.log(arr);
  if (arr[0] === "NAME") {
    if (arr[1] === "ASC") {
      list.sort(function (a, b) {
        return a.studentName < b.studentName ? -1 : 1;
      });
    } else {
      list.sort(function (a, b) {
        return a.studentName > b.studentName ? -1 : 1;
      });
    }
  } else {
    if (arr[1] === "ASC") {
      list.sort(function (a, b) {
        return a.age - b.age;
      });
    } else {
      list.sort(function (a, b) {
        return b.age - a.age;
      });
    }
  }
}
