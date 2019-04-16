google.charts.load('current', {
    'packages':['geochart', 'corechart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
google.charts.setOnLoadCallback(drawChart);

url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=All&headers=1&tq=";

function drawChart() {
    // GDP
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawEastAsiasMapGDP);
    
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawOceaniasMapGDP);

    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawPieGDP);

    // Revenue
    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawEastAsiasMapRevenue);
    
    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawOceaniasMapRevenue);

    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawPieRevenue);
}

function errorGen(res) {
    alert(
        "Error in query: " +
        res.getMessage() +
        " " +
        res.getDetailedMessage()
    );
}

function drawEastAsiasMapGDP(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "Oceania's Geomap ( Million $US )",
        region: '030',
        colorAxis: {colors: ['green', 'red']},
        resolution: 'countries',
        width: 556, 
        height: 347,
    };

    var chart = new google.visualization.GeoChart(document.getElementById('east_asia_regions_gdp'));
    chart.draw(data, options);
}

function drawOceaniasMapGDP(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "East Asia's Geomap ( Million $US )",
        region: '053',
        colorAxis: {colors: ['green', 'red']},
        resolution: 'countries',
        width: 556, 
        height: 347,
    };

    var chart = new google.visualization.GeoChart(document.getElementById('oceania_regions_gdp'));
    chart.draw(data, options);
}

function drawPieGDP(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "%GDP in five country",
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_gdp'));
    chart.draw(data, options);
  }

  function drawEastAsiasMapRevenue(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "Oceania's Geomap ( Million $US )",
        region: '030',
        colorAxis: {colors: ['green', 'red']},
        resolution: 'countries',
        width: 556, 
        height: 347,
    };

    var chart = new google.visualization.GeoChart(document.getElementById('east_asia_regions_revenue'));
    chart.draw(data, options);
}

function drawOceaniasMapRevenue(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "East Asia's Geomap ( Million $US )",
        region: '053',
        colorAxis: {colors: ['green', 'red']},
        resolution: 'countries',
        width: 556, 
        height: 347,
    };

    var chart = new google.visualization.GeoChart(document.getElementById('oceania_regions_revenue'));
    chart.draw(data, options);
}

function drawPieRevenue(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    var options = {
        title: "%Revenue in five country",
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_revenue'));
    chart.draw(data, options);
  }