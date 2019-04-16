google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
url = "https://docs.google.com/spreadsheets/d/1YkpH2klZ3CiLEmfmuh15aZaV37EdL0WVPd0cy_KBnPU/gviz/tq?sheet=japan_gdpxrevenue&headers=1&tq=";

function drawChart() {
  var queryString = encodeURIComponent("select A,H");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleGDPLineResponse);

  var queryString = encodeURIComponent("select A,J");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleRevLineResponse);

  queryString = encodeURIComponent("select A,B,C,D,E,F,G");
  var query = new google.visualization.Query( url + queryString );
  query.send(handleGDPAreaResponse);

  queryString = encodeURIComponent("select A,K,L,M,N");
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
    document.getElementById("jap_gdp_line_div")
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
    document.getElementById("jap_rev_line_div")
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
    document.getElementById("jap_rev_area_div")
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
    document.getElementById("jap_gdp_area_div")
  );
  gdp_area.draw(data, options_fullStacked);
}



