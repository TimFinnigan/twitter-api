$(document).ready(function () {
  fetch("formatted_data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      $("#tweet-table").DataTable({
        data: data,
        columns: [
          { title: "Timestamp" },
          { title: "Day" },
          { title: "Time" },
          { title: "User" },
          { title: "Tweet" },
        ],
        order: [[0, "asc"]],
        scrollY: "80vh",
        scrollCollapse: true,
        paging: false,
        columnDefs: [
          { type: "time", targets: 0 },
          { visible: false, targets: 0 },
          { orderable: false, targets: [1, 2, 3, 4] },
        ],
      });
    });
});
