google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=Korea&headers=1&tq=";

function drawChart() {
  var queryString = encodeURIComponent("select A,B");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleGDPLineResponse);

  var queryString = encodeURIComponent("select A,I");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleRevLineResponse);

  queryString = encodeURIComponent("select A,C,D,E,F,G,H");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleGDPAreaResponse);

  queryString = encodeURIComponent("select A,J,K,L,M,N,O,P,Q");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleRevAreaResponse);
}

function errorAlert(res) {
  alert(
    "Error in query: " +
      res.getMessage() +
      " " +
      res.getDetailedMessage()
  );
}

function handleGDPLineResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }

  var data = response.getDataTable();

  var options = {
    title: "GDP over year ( Million $US )",
    curveType: "function",
    legend: { position: "none" },
    hAxis: {
      format:'#',
      title: "year"
    }
  };

  var gdp_line = new google.visualization.LineChart(
    document.getElementById("kor_gdp_line_div")
  );
  gdp_line.draw(data, options);
}

function handleRevLineResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }

  var data = response.getDataTable();

  var options = {
    title: "Government's Revenue ( Million $US )",
    curveType: "function",
    legend: { position: "none" },
    hAxis: {
      format:'#',
      title: "year"
    }
  };

  var rev_line = new google.visualization.LineChart(
    document.getElementById("kor_rev_line_div")
  );
  rev_line.draw(data, options);
}

function handleRevAreaResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }
  var data = response.getDataTable();

  var options_fullStacked = {
    title : "Government's Revenue Factors",
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
  
  var rev_area = new google.visualization.AreaChart(
    document.getElementById("kor_rev_area_div")
  );
  rev_area.draw(data, options_fullStacked);
}

function handleGDPAreaResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }
  var data = response.getDataTable();

  var options_fullStacked = {
    title : "GDP Factors",
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
  
  var gdp_area = new google.visualization.AreaChart(
    document.getElementById("kor_gdp_area_div")
  );
  gdp_area.draw(data, options_fullStacked);
}