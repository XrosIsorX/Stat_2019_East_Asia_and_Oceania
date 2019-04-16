google.charts.load('current', {
    'packages':['geochart','corechart','line'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
google.charts.setOnLoadCallback(drawChart);

url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=All_GDP&headers=1&tq=";
url2 = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=Tax&headers=1&tq=";

function drawChart() {
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query( url + queryString );
    query.send(drawRegionsMap);
    
    queryString = encodeURIComponent("select A,B,C,D,E,F");
    query = new google.visualization.Query(url2 + queryString);
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

function drawRegionsMap(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
        }

    var data = response.getDataTable();

    var options = {
        title: "East Asia and Oceania's Geomap ( Million $US )",
        curveType: "function",
        legend: { position: "none" },
        hAxis: {
            format:'#',
            title: "year"
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

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
