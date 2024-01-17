// load firstwidget 
const _loadDashboard = () => {
    setTimeout(function() {
        $.ajax({
            url: BASE_URL+ "/app_admin/load_first_widget",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                $('#firstWidget').html(data.output);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('Load data is error');
            }
        });
    }, 500);
}

// load trend tahun pengadaan 
const _loadTrendPertahun = () => {
    setTimeout( function() {
        var optionsChart1 = {
            series: [],
            chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: function(val, opt) { 
            return val
                // return opt.w.globals.categoryLabels[opt.seriesIndex]
            },
            offsetX: 0,
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0,
          },
            title: {
                text: ' TREND JUMLAH ASET BERDASARKAN TAHUN PENGADAAN',
                align: 'center'
            },
            grid: {
                row: {
                colors: ['#FFFFFF'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
          xaxis: {
            categories: [],
            title: {
                text: 'TAHUN PENGADAAN'
            }
          },
          yaxis: {
            title: {
                text: 'JUMLAH ASET'
                }
            },
          fill: {
                opacity: 1
            },
          tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
        };
        var chart1 = new ApexCharts(document.querySelector("#trend-asetPertahun"), optionsChart1);
        chart1.render();
        $.ajax({
            url: BASE_URL+ "/app_admin/load_trend_pengadaan",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                $('#loader').hide();
                var tahun = data.dataTahun;
                var dataCount = data.countData;
                setTimeout( function() {
                    chart1.updateOptions({
                        series: [{
                            name: 'JUMLAH PENDATAAN ASET',
                            data: dataCount,
                        }],
                        xaxis: {
                                categories: tahun,
                        },
                    });
                }, 1000);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('Load data is error');
            }
        });
    }, 500);
}

// load trend pendataan aset 
const _loadTrendPendataanAset = () => {
    var date = new Date();
	var yyyy = date.getFullYear();
    setTimeout( function() {
        var optionsChart2 = {
            series: [],
            chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: function(val, opt) { 
            return val
                // return opt.w.globals.categoryLabels[opt.seriesIndex]
            },
            offsetX: 0,
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0,
          },
            title: {
                text: ' TREND PENDATAAN ASET '+yyyy,
                align: 'center'
            },
            grid: {
                row: {
                colors: ['#FFFFFF'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
          xaxis: {
            categories: [],
            title: {
                text: 'BULAN (JANUARI s/d DESEMBER)'
            }
          },
          yaxis: {
            title: {
                text: 'JUMLAH ASET'
                }
            },
          fill: {
                opacity: 1
            },
          tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
        };
        var chart2 = new ApexCharts(document.querySelector("#trend-pendataanAset"), optionsChart2);
        chart2.render();
        $.ajax({
            url: BASE_URL+ "/app_admin/load_trend_pendataan",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                $('#loader2').hide();
                chart2.updateOptions({
                    series: [{
                        name: 'JUMLAH PENDATAAN ASET',
                        data: data.amountData,
                    }],
                    xaxis: {
                            categories: data.xavisBulan,
                    },
                });
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('Load data is error');
            }
        });
    }, 500);
}

// Class Initialization
jQuery(document).ready(function() {
    _loadDashboard(), _loadTrendPertahun(), _loadTrendPendataanAset();
});