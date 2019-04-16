google.charts.load('current', {
    'packages':['geochart','corechart','line'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
google.charts.setOnLoadCallback(drawChart);

all_url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=All&headers=1&tq=";
all_gdp_url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=All_GDP&headers=1&tq=";
all_revenue_url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=All_Revenue&headers=1&tq=";
tax_url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=Tax&headers=1&tq=";

function drawChart() {
    // GDP
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawEastAsiasMapGDP);
    
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawOceaniasMapGDP);

    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawPieGDP);

    var queryString = encodeURIComponent("select A, B, C, D, E, F");
    var query = new google.visualization.Query(all_gdp_url + queryString );
    query.send(drawLineGDP);

    // Revenue
    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawEastAsiasMapRevenue);
    
    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawOceaniasMapRevenue);

    var queryString = encodeURIComponent("select A, C");
    var query = new google.visualization.Query(all_url + queryString );
    query.send(drawPieRevenue);
    
    var queryString = encodeURIComponent("select A, B, C, D, E, F");
    var query = new google.visualization.Query(all_revenue_url + queryString );
    query.send(drawLineRevenue);

    // Tax
    queryString = encodeURIComponent("select A,B,C,D,E,F");
    query = new google.visualization.Query(tax_url + queryString);
    query.send(handleTaxResponse);
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

function drawLineGDP(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();

    var options = {
        title: "GDP trend in five country",
        subtitle : "หน่วย ( Million $US )",
        vAxis:{
            title: 'GDP'
        },
        hAxis: {
            title: 'year'
        },
    };

    var chart = new google.charts.Line(
        document.getElementById("line_all_gdp")
    );
    chart.draw(data, google.charts.Line.convertOptions(options));
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

function handleTaxResponse(response) {
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
        title: "ภาษีของแต่ละประเทศเมื่อเทียบกับรายรับในแต่ละปี",
        subtitle : "หน่วย $US",
        vAxis:{
            title: 'ภาษีที่ต้องจ่าย (USD)'
        },
        hAxis: {
            title: 'รายรับบุคคล (USD)'
        },
    };

    var tax_regression = new google.charts.Line(
        document.getElementById("tax_regression_div")
    );
    tax_regression.draw(data, google.charts.Line.convertOptions(options));
}

function drawLineRevenue(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();

    var options = {
        title: "Revenue trend in five country",
        subtitle : "หน่วย ( Million $US )",
        vAxis:{
            title: 'Revenue'
        },
        hAxis: {
            title: 'year'
        },
    };

    var chart = new google.charts.Line(
        document.getElementById("line_all_revenue")
    );
    chart.draw(data, google.charts.Line.convertOptions(options));
}
