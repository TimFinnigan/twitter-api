$(document).ready(function () {
  fetch("formatted_data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      $("#tweet-table").DataTable({
        data: data,
        columns: [
          { title: "Timestamp" },
          { title: "Date" },
          { title: "User" },
          { title: "Tweet" },
        ],
        order: [[0, "desc"]],
        scrollY: "800px",
        scrollCollapse: true,
        paging: false,
        // ordering: false,
        columnDefs: [
          { type: "time", targets: 0 },
          { visible: false, targets: 0 },
        ],
      });
    });
});
