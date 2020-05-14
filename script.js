$(document).ready(function () {
  const loadTable = function (data, skipRetweets) {
    if (skipRetweets) {
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i][4]);
        if (data[i][4].substring(0, 2) == "RT") continue;
        newData.push(data[i]);
      }
      data = newData;
    }

    $("#tweet-table").DataTable({
      data: data,
      columns: [
        { title: "Timestamp" },
        { title: "Day" },
        { title: "Time" },
        { title: "User" },
        { title: "Tweet" },
        { title: "Retweets" },
        { title: "Favorites" },
      ],
      order: [[0, "desc"]],
      scrollY: "80vh",
      scrollCollapse: true,
      paging: false,
      columnDefs: [
        { type: "time", targets: 0 },
        { visible: false, targets: 0 },
        { orderable: false, targets: [1, 2, 4] },
        { orderSequence: ["desc", "asc", ""], targets: [5, 6] },
        { orderSequence: ["asc", "desc", ""], targets: [3] },
      ],
    });
  };

  fetch("formatted_data.json")
    .then((response) => response.json())
    .then((data) => {
      loadTable(data);

      $("#skip-retweets").click(function () {
        $("#tweet-table").DataTable().destroy();
        loadTable(data, true);
      });
    });
});
