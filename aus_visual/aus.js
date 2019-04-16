google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var queryString = encodeURIComponent("select A,I");

  var query = new google.visualization.Query(
    "https://docs.google.com/spreadsheets/d/1qPHJNNAcuSYG2V7nPcvsg20IV07jSsvPPqS69PvH27o/gviz/tq?sheet=Sheet1&headers=1&tq=" +
      queryString
  );
  query.send(handleGDPResponse);

  queryString = encodeURIComponent("select A,B,C,D,E,F,G,H,I");

  query = new google.visualization.Query(
    "https://docs.google.com/spreadsheets/d/1Yn-KtRYZ_dQNjzlPlv3xfacdgzXVHJmsvINC2F1WlKU/gviz/tq?sheet=Sheet1&headers=1&tq=" +
      queryString
  );

  query.send(handleRevResponse);
}

function handleGDPResponse(response) {
  if (response.isError()) {
    alert(
      "Error in query: " +
        response.getMessage() +
        " " +
        response.getDetailedMessage()
    );
    return;
  }
  var data = response.getDataTable();

  var options = {
    title: "Australia's GDP over year ( Million $US )",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      format:'#',
      title: "year"
    }
  };

  var gdp_chart = new google.visualization.LineChart(
    document.getElementById("aus_gdp_chart_div")
  );
  gdp_chart.draw(data, options);
}

function handleRevResponse(response) {
  if (response.isError()) {
    alert(
      "Error in query: " +
        response.getMessage() +
        " " +
        response.getDetailedMessage()
    );
    return;
  }
  var data = response.getDataTable();

  var options_fullStacked = {
    title : "Australia Government's Revenue ( Million $AU )",
    isStacked: "relative",
    legend: { position: "right", maxLines: 3 },
    vAxis: {
      format: "#%",
      minValue: 0,
      ticks: [0, 0.2, 0.4, 0.6, 0.8, 1]
    },
    hAxis: {
      format:'#',
      title: "year"
    }
  };
  
  var rev_chart = new google.visualization.AreaChart(
    document.getElementById("aus_rev_chart_div")
  );
  rev_chart.draw(data, options_fullStacked);
}
