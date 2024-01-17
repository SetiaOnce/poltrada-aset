//Class Definition
var save_method;var table;var table2;var table3;var table4;var table5;
//Class Initialization
jQuery(document).ready(function() {
    _loadDataAset();
    loadSelectpicker_jenis(),loadSelectpicker_status(),loadSelectpicker_unitkerja(),loadSelectpicker_satuan();

    // toggle dropdown
    $('.dropdown-export').click(function(){
        $('.dropdown-export-menu').toggleClass('show');
    });
    $(window).click(function() {
        $('.dropdown-export-menu').removeClass('show');
    });
});

// load jenis aset
function loadSelectpicker_jenis() {
    $.ajax({
        url: BASE_URL+ "/select/ajax_getjenisaset",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var output = '';
            var i;
            for (i = 0; i < data.length; i++) {
                output += '<option value="' + data[i].id + '" data-icon="bi bi-' + data[i].icon + ' font-size-lg bs-icon me-3">' + data[i].kode_jenis_aset + ' - ' + data[i].jenis_aset + '</option>';
            }
            $('#filterDt-jenisAset').html(output).selectpicker('refresh').selectpicker('val', '');
            $('#fid_jenis').html(output).selectpicker('refresh').selectpicker('val', '');
        }, complete: function(){
            var jenisaset_filterberanda = $('#filterDt-jenisAset-fromBeranda').val();
            if (jenisaset_filterberanda!='') {
                $('#filterDt-jenisAset').selectpicker('val', jenisaset_filterberanda);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
}
// load status aset
function loadSelectpicker_status() {
    $.ajax({
        url: BASE_URL+ "/select/ajax_getstatusaset",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var output = '';
            var i;
            for (i = 0; i < data.length; i++) {
                output += '<option value="' + data[i].id + '" data-icon="bi bi-' + data[i].icon + ' font-size-lg bs-icon me-3">' + data[i].status_aset + '</option>';
            }
            $('#filterDt-statusAset').html(output).selectpicker('refresh').selectpicker('val', '');
            $('#fid_status').html(output).selectpicker('refresh').selectpicker('val', '');
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
}
$('#btnResetFilter').click(function(){
    $('#filterDt-jenisAset').selectpicker('refresh').selectpicker('val', '');
    $('#filterDt-statusAset').selectpicker('refresh').selectpicker('val', '');
    reload_dtaset();
});

/*************************
    Custom Select Master Satuan Aset
*************************/
function loadSelectpicker_satuan() {
    $.ajax({
        url: BASE_URL+ "/select/ajax_getsatuanaset",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var output = '';
            var i;
            for (i = 0; i < data.length; i++) {
                output += '<option value="' + data[i].id + '">' + data[i].satuan_aset + '</option>';
            }
            $('#fid_satuan').html(output).selectpicker('refresh').selectpicker('val', '');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
}
/*************************
    Custom Select Master Unit Kerja Group
*************************/
function loadSelectpicker_unitkerja() {
    $.ajax({
        url: BASE_URL+ "/select/ajax_getunitkerja",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var output = '';
            var i;
            for (i = 0; i < data.length; i++) {
                output += '<option value="' + data[i].id + '">' + data[i].unit_kerja + '</option>';
            }
            $('#fid_unit_kerja').html(output).selectpicker('refresh').selectpicker('val', '');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
}
/*************************
    OnChange Select Master Jenis Aset on DT
*************************/
$('#filterDt-jenisAset').change(function () {
    //var idp = $(this).val();
    reload_dtaset();
});
/*************************
    OnChange Select Master Jenis Aset on DT
*************************/
$('#filterDt-statusAset').change(function () {
    //var idp = $(this).val();
    reload_dtaset();
});

// ===>>  FOR DATATABLE ASET <<=== //
// load datatable data aset
const _loadDataAset = () => {
    table = $('#dt-aset').DataTable({
        buttons: [{
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },{
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },{
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            }
        ],
        "processing": true,
        "serverSide": false,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_data_aset",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_jenis= $('#filterDt-jenisAset').val();
                data.idp_status= $('#filterDt-statusAset').val();
            }
        },
        "destroy" : true,
        "draw" : true,
        "deferRender" : true,
        'responsive': false,
        'autoWidth': false,
        'stateSave': false,
        "LengthChange" : true,
        "paginate" : true,
        "pageResize" : true,
        //Set column definition initialisation properties.
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'jenis_aset', name: 'jenis_aset', "visible": false},
            { data: 'nama', name: 'nama'},
            { data: 'kode', name: 'kode'},
            { data: 'tahun_pengadaan', name: 'tahun_pengadaan'},
            { data: 'harga_pengadaan', name: 'harga_pengadaan'},
            { data: 'harga_sekarang', name: 'harga_sekarang'},
            { data: 'status', name: 'status'},
            { data: 'thumbnail', name: 'thumbnail'},
            { data: 'action', name: 'action'},
        ],
        "columnDefs": [
            { "width": "5%", "targets": 0, "className": "text-center align-top" },
            { "width": "35%", "targets": 1, "className": "align-top" },
            { "width": "25%", "targets": 2, "className": "align-top",},
            { "width": "5%", "targets": 3, "className": "align-top text-center",},
            { "width": "5%", "targets": 4, "className": "align-top text-center"," searchable": false},
            { "width": "5%", "targets": 5, "className": "align-top text-center", "searchable": false},
            { "width": "5%", "targets": 6, "className": "align-top text-center", "searchable": false},
            { "width": "10%", "targets": 7, "className": "align-top text-center", "orderable": false , "searchable": false},
            { "width": "5%", "targets": 8, "className": "align-top text-center", "orderable": false , "searchable": false},
            { "width": "5%", "targets": 9, "className": "align-top text-center", "orderable": false , "searchable": false},
        ],
        oLanguage: {
            sEmptyTable: "Tidak ada Data yang dapat ditampilkan..",
            sInfo: "Menampilkan _START_ s/d _END_ dari _TOTAL_",
            sInfoEmpty: "Menampilkan 0 - 0 dari 0 entri.",
            sInfoFiltered: "",
            sProcessing: `<div class="d-flex justify-content-center align-items-center"><span class="spinner-border align-middle me-3"></span> Mohon Tunggu...</div>`,
            sZeroRecords: "Tidak ada Data yang dapat ditampilkan..",
            "sLengthMenu" : `Tampilkan: <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="-1">Semua</option>
            </select> Baris`, //"Tampilkan _MENU_",
            oPaginate: {
                sPrevious: "Sebelumnya",
                sNext: "Selanjutnya",
            },
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        fnDrawCallback: function (settings, display) {
            $('[data-bs-toggle="tooltip"]').tooltip("dispose"), $(".tooltip").hide();
            //Custom Table
            $('#dt-aset_length select').addClass('form-control form-control-sm').selectpicker()
            $('[data-bs-toggle="tooltip"]').tooltip({ 
                trigger: "hover"
            }).on("click", function () {
                $(this).tooltip("hide");
            });
            $('.image-popup').magnificPopup({
                type: 'image', closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true,
                image: {
                    verticalFit: true
                }
            });
            var api = this.api();
			var rows = api.rows({
				page: 'current'
			}).nodes();
			var last = null;
			api.column(1, {
				page: 'current'
			}).data().each(function (group, i) {
				if (last !== group) {
					$(rows).eq(i).before(
						'<tr class="align-middle"><td class="bg-light" colspan="9"><b>' + group + '</b></td></tr>'
					);
					last = group;
				}
			});
        },
    });
    $('#dt-aset').css('width', '100%').DataTable().columns.adjust().draw();
    $('#export_print').on('click', function(e) {
        e.preventDefault();
        table.button(0).trigger();
    });
    $('#export_excel').on('click', function(e) {
        e.preventDefault();
        table.button(1).trigger();
    });
    $('#export_copy').on('click', function(e) {
        e.preventDefault();
        table.button(2).trigger();
    });
}
//load DataTable File Data Aset
function load_filedtaset(idp, mode_show) {
    //datatables
    table2 = $('#dt-fileAset').DataTable({
        "searchDelay": 500,
        "processing": true,
        "serverSide": true,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_data_file_aset",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_aset= idp;
                data.mode_show= mode_show;
            }
        },
        "destroy" : true,
        "draw" : true,
        "deferRender" : true,
        "responsive" : false,
        "autoWidth" : true,
        "LengthChange" : true,
        "paginate" : true,
        "pageResize" : true,
        //Set column definition initialisation properties.
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'nama', name: 'nama'},
            { data: 'file', name: 'file'},
            { data: 'action', name: 'action'},
        ],
        "columnDefs": [
            { "width": "10%", "targets": 0, "className": "text-center" },
            { "width": "40%", "targets": 1, "className": "align-top" },
            { "width": "30%", "targets": 2, "className": "text-center align-top" },
			{"width": "20%", "targets": 3, "className": "text-center align-top", "orderable": false }
        ],
        "oLanguage": {
            "sSearch" : "<i class='flaticon-search-1'></i>",
            "sSearchPlaceholder": "Pencarian...",
            "sEmptyTable" : "Tidak ada Data yang dapat ditampilkan..",
            "sInfo" : "Menampilkan _START_ s/d _END_ dari _TOTAL_ entri.",
            "sInfoEmpty" : "Menampilkan 0 - 0 dari 0 entri.",
            "sInfoFiltered" : "",
            "sProcessing" : `<div class="d-flex justify-content-center align-items-center"><span class="spinner spinner-track position-static spinner-primary spinner-lg spinner-left"></span> <span class="text-dark">Mohon tunggu...</span></div>`,
            "sZeroRecords": "Tidak ada Data yang dapat ditampilkan..",
            "sLengthMenu" : `Tampilkan: <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="-1">Semua</option>
            </select> Baris`, //"Tampilkan _MENU_",
            "oPaginate" : {
                "sPrevious" : "Sebelumnya",
                "sNext" : "Selanjutnya"
            }
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        "fnDrawCallback": function (settings, display) {
            $('#dt-fileAset_length select').addClass('form-control form-control-sm').selectpicker(), $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'}).on('click', function(){$(this).tooltip('hide')});
            $('.image-popup').magnificPopup({
                type: 'image',  closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true,
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true, duration: 150
                }
            });
            $('.lightboxImg').magnificPopup({
                type: 'image', tLoading: 'Sedang memuat foto #%curr%...', mainClass: 'mfp-img-mobile',
                closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true, image: {
                    verticalFit: true
                }
            });
        }
    });
    
    $('#dt-fileAset').css('width', '100%').DataTable().columns.adjust().draw();
};
//load Perawatan Data Aset
function load_perawatan(idp) {
    //datatables
    table4 = $('#dt-perawatan').DataTable({
        "searchDelay": 500,
        "processing": true,
        "serverSide": true,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_data_aset_perawatan",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_aset= idp;
            }
        },
        "destroy" : true,
        "draw" : true,
        "deferRender" : true,
        "responsive" : false,
        "autoWidth" : true,
        "LengthChange" : true,
        "paginate" : true,
        "pageResize" : true,
        //Set column definition initialisation properties.
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'tanggal', name: 'tanggal'},
            { data: 'keterangan', name: 'keterangan'},
            { data: 'image', name: 'image'},
        ],
        "columnDefs": [
            { "width": "10%", "targets": 0, "className": "text-center" },
            { "width": "10%", "targets": 1, "className": "align-top" },
            { "width": "60%", "targets": 2, "className": "align-top" },
			{"width": "20%", "targets": 3, "className": "text-center align-top", "orderable": false }
        ],
        "oLanguage": {
            "sSearch" : "<i class='flaticon-search-1'></i>",
            "sSearchPlaceholder": "Pencarian...",
            "sEmptyTable" : "Tidak ada Data yang dapat ditampilkan..",
            "sInfo" : "Menampilkan _START_ s/d _END_ dari _TOTAL_ entri.",
            "sInfoEmpty" : "Menampilkan 0 - 0 dari 0 entri.",
            "sInfoFiltered" : "",
            "sProcessing" : `<div class="d-flex justify-content-center align-items-center"><span class="spinner spinner-track position-static spinner-primary spinner-lg spinner-left"></span> <span class="text-dark">Mohon tunggu...</span></div>`,
            "sZeroRecords": "Tidak ada Data yang dapat ditampilkan..",
            "sLengthMenu" : `Tampilkan: <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="-1">Semua</option>
            </select> Baris`, //"Tampilkan _MENU_",
            "oPaginate" : {
                "sPrevious" : "Sebelumnya",
                "sNext" : "Selanjutnya"
            }
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        "fnDrawCallback": function (settings, display) {
            $('#dt-perawatan_length select').addClass('form-control form-control-sm').selectpicker(), $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'}).on('click', function(){$(this).tooltip('hide')});
            $('.image-popup').magnificPopup({
                type: 'image',  closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true,
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true, duration: 150
                }
            });
            $('.lightboxImg').magnificPopup({
                type: 'image', tLoading: 'Sedang memuat foto #%curr%...', mainClass: 'mfp-img-mobile',
                closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true, image: {
                    verticalFit: true
                }
            });
        }
    });
    
    $('#dt-perawatan').css('width', '100%').DataTable().columns.adjust().draw();
};
// load DataTable pemeriksaan
function load_pemeriksaan(idp) {
    //datatables
    table5 = $('#dt-pemeriksaan').DataTable({
        "searchDelay": 500,
        "processing": true,
        "serverSide": true,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_data_aset_pemeriksaan",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_aset= idp;
            }
        },
        "destroy" : true,
        "draw" : true,
        "deferRender" : true,
        "responsive" : false,
        "autoWidth" : true,
        "LengthChange" : true,
        "paginate" : true,
        "pageResize" : true,
        //Set column definition initialisation properties.
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'tanggal', name: 'tanggal'},
            { data: 'keterangan', name: 'keterangan'},
            { data: 'image', name: 'image'},
        ],
        "columnDefs": [
            { "width": "10%", "targets": 0, "className": "text-center" },
            { "width": "10%", "targets": 1, "className": "align-top" },
            { "width": "60%", "targets": 2, "className": " align-top" },
			{"width": "20%", "targets": 3, "className": "text-center align-top", "orderable": false }
        ],
        "oLanguage": {
            "sSearch" : "<i class='flaticon-search-1'></i>",
            "sSearchPlaceholder": "Pencarian...",
            "sEmptyTable" : "Tidak ada Data yang dapat ditampilkan..",
            "sInfo" : "Menampilkan _START_ s/d _END_ dari _TOTAL_ entri.",
            "sInfoEmpty" : "Menampilkan 0 - 0 dari 0 entri.",
            "sInfoFiltered" : "",
            "sProcessing" : `<div class="d-flex justify-content-center align-items-center"><span class="spinner spinner-track position-static spinner-primary spinner-lg spinner-left"></span> <span class="text-dark">Mohon tunggu...</span></div>`,
            "sZeroRecords": "Tidak ada Data yang dapat ditampilkan..",
            "sLengthMenu" : `Tampilkan: <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="-1">Semua</option>
            </select> Baris`, //"Tampilkan _MENU_",
            "oPaginate" : {
                "sPrevious" : "Sebelumnya",
                "sNext" : "Selanjutnya"
            }
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        "fnDrawCallback": function (settings, display) {
            $('#dt-pemeriksaan_length select').addClass('form-control form-control-sm').selectpicker(), $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'}).on('click', function(){$(this).tooltip('hide')});
            $('.image-popup').magnificPopup({
                type: 'image',  closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true,
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true, duration: 150
                }
            });
            $('.lightboxImg').magnificPopup({
                type: 'image', tLoading: 'Sedang memuat foto #%curr%...', mainClass: 'mfp-img-mobile',
                closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true, image: {
                    verticalFit: true
                }
            });
        }
    });
    
    $('#dt-pemeriksaan').css('width', '100%').DataTable().columns.adjust().draw();
};
//load DataTable File Data Aset Modal
function load_filedtaset_modal(idp, mode_show) {
    //datatables
    table3 = $('#dt-fileAsetMdl').DataTable({
        "searchDelay": 500,
        "processing": true,
        "serverSide": true,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_data_file_aset",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_aset= idp;
                data.mode_show= mode_show;
            }
        },
        "destroy" : true,
        "draw" : true,
        "deferRender" : true,
        "responsive" : false,
        "autoWidth" : true,
        "LengthChange" : true,
        "paginate" : true,
        "pageResize" : true,
        //Set column definition initialisation properties.
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'nama', name: 'nama'},
            { data: 'file', name: 'file'},
            // { data: 'action', name: 'action'},
        ],
        "columnDefs": [
            { "width": "10%", "targets": 0, "className": "text-center" },
            { "width": "40%", "targets": 1, "className": "align-top" },
            { "width": "30%", "targets": 2, "className": "text-center align-top" },
			// {"width": "20%", "targets": 3, "className": "text-center align-top", "orderable": false }
        ],
        "oLanguage": {
            "sSearch" : "<i class='flaticon-search-1'></i>",
            "sSearchPlaceholder": "Pencarian...",
            "sEmptyTable" : "Tidak ada Data yang dapat ditampilkan..",
            "sInfo" : "Menampilkan _START_ s/d _END_ dari _TOTAL_ entri.",
            "sInfoEmpty" : "Menampilkan 0 - 0 dari 0 entri.",
            "sInfoFiltered" : "",
            "sProcessing" : `<div class="d-flex justify-content-center align-items-center"><span class="spinner spinner-track position-static spinner-primary spinner-lg spinner-left"></span> <span class="text-dark">Mohon tunggu...</span></div>`,
            "sZeroRecords": "Tidak ada Data yang dapat ditampilkan..",
            "sLengthMenu" : `Tampilkan: <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="-1">Semua</option>
            </select> Baris`, //"Tampilkan _MENU_",
            "oPaginate" : {
                "sPrevious" : "Sebelumnya",
                "sNext" : "Selanjutnya"
            }
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        "fnDrawCallback": function (settings, display) {
            $('#dt-fileAsetMdl_length select').addClass('form-control form-control-sm').selectpicker(), $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'}).on('click', function(){$(this).tooltip('hide')});
            $('.image-popup').magnificPopup({
                type: 'image',  closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true,
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true, duration: 150
                }
            });
            $('.lightboxImg').magnificPopup({
                type: 'image', tLoading: 'Sedang memuat foto #%curr%...', mainClass: 'mfp-img-mobile',
                closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true, image: {
                    verticalFit: true
                }
            });
        }
    });
    $('#dt-fileAsetMdl').css('width', '100%').DataTable().columns.adjust().draw();
};
//Refresh Datatables Data Aset
function reload_dtaset() {
	$('#dt-aset').DataTable().ajax.reload(), $('#dt-aset').css('width', '100%').DataTable().columns.adjust().draw();
}
//Refresh Datatables File Data Aset
function reload_filedtaset() {
	$('#dt-fileAset').DataTable().ajax.reload(), $('#dt-fileAset').css('width', '100%').DataTable().columns.adjust().draw();
}
// ===>>  END DATATABLE <<=== //

//Detail Data Aset
function _detail_aset(idp){
    let target = document.querySelector("#col-dtAset"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block();blockUi.destroy();
    //Ajax Load data from ajax
    $.ajax({
        url : BASE_URL+ "/ajax/load_detail_aset",
        type: "GET",
        dataType: "JSON",
        data: {
            idp
        },success: function(data)
        {
            if(data.status==true){
                var mapsLocation;
                if(data.lat_lng==null || data.lat_lng==''){
                    mapsLocation = '';
                }else{
                    mapsLocation = `<div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400 mb-2">Titik Koordinat: </span>
                        <span class="d-block mb-3"><div id="detailLokasi_maps" style="height: 200px;"></div></span>
                        <span class="fs-6 fw-bolder">` +data.lat_lng+ `</span>
                    </div>`;
                }
                var divDetailAset = `
                <div class="col-lg-12">
                    <h3 class="font-weight-normal">Data Aset</h3>
                </div>
                <div class="col-lg-6">
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Jenis: </span>
                        <span class="fs-6 fw-bolder">` +data.jenis_aset+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Nama: </span>
                        <span class="fs-6 fw-bolder">` +data.nama+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">NUP: </span>
                        <span class="fs-6 fw-bolder">` +data.kode+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Tipe: </span>
                        <span class="fs-6 fw-bolder">` +data.type+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">No. Registrasi: </span>
                        <span class="fs-6 fw-bolder">` +data.no_registrasi+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Unit Kerja: </span>
                        <span class="fs-6 fw-bolder">` +data.unit_kerja+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Tahun Pengadaan: </span>
                        <span class="fs-6 fw-bolder">` +data.tahun_pengadaan+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Harga Pengadaan (Rp.): </span>
                        <span class="fs-6 fw-bolder">` +data.hargapengadaan+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Harga Sekarang (Rp.): </span>
                        <span class="fs-6 fw-bolder">` +data.hargasekarang+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Volume: </span>
                        <span class="fs-6 fw-bolder">` +data.volume+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Jumlah: </span>
                        <span class="fs-6 fw-bolder">` +data.jumlah+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Satuan: </span>
                        <span class="fs-6 fw-bolder">` +data.satuan_aset+ `</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Lokasi: </span>
                        <span class="fs-6 fw-bolder">` +data.lokasi+ `</span>
                    </div>
                    ` +mapsLocation+ `
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">Spesifikasi: </span>
                        <span class="fs-6 fw-bolder">` +data.spesifikasi+ `</span>
                    </div>
                    <div class="d-flex flex-column flex-root mb-3">
                        <span class="fs-6 text-gray-400">status: </span>
                        <span class="fs-6 fw-bolder">` +data.status_aset+ `</span>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="separator separator-solid separator-border-2 mt-5 mb-7"></div>
                    <h3 class="font-weight-normal mb-5">File Data Aset</h3>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table id="dt-fileAsetMdl" class="table table-hover table-head-custom dtr-inline w-100">
                            <thead class="table-dark">
                                <tr>
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">Nama File</th>
                                    <th class="align-middle">File</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="separator separator-solid separator-border-2 mt-5 mb-7"></div>
                    <h3 class="font-weight-normal mb-5">Data Perawatan</h3>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table id="dt-perawatan" class="table table-hover table-head-custom dtr-inline w-100">
                            <thead class="table-dark">
                                <tr>
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">TANGGAL PERAWATAN</th>
                                    <th class="align-middle">KETERANGAN</th>
                                    <th class="align-middle">FOTO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="separator separator-solid separator-border-2 mt-5 mb-7"></div>
                    <h3 class="font-weight-normal mb-5">Data Pemeriksaan</h3>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table id="dt-pemeriksaan" class="table table-hover table-head-custom dtr-inline w-100">
                            <thead class="table-dark">
                                <tr>
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">TANGGAL PEMERIKSAAN</th>
                                    <th class="align-middle">KETERANGAN</th>
                                    <th class="align-middle">FOTO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>`;
                $('#dtlDataAset_mdl').html(divDetailAset), $('#detailasetModal .modal-header .modal-title').html('<i class="icofont-search-document text-dark"></i> ' +data.nama+ ' (' +data.kode+ ')');
                if(data.lat_lng==null || data.lat_lng==''){
                    console.log('null');
                }else{
                    loadmaps_todetailaset_modal(data.lat_lng);
                }
                blockUi.release(), blockUi.destroy();
                $('#detailasetModal').modal('show');
                load_filedtaset_modal(idp, 'detail');
                load_perawatan(idp);
                load_pemeriksaan(idp);
            }else{
                blockUi.release(), blockUi.destroy();
                swal.fire("Ooops!", "Terjadi kesalahan periksa koneksi internet lalu coba kembali!", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            blockUi.release(), blockUi.destroy();
            console.log('Load data is error!');
            swal.fire("Ooops!", "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang!", "error");
        }
    });
}
//Load Detail Lokasi by Koordinat Aset
function loadmaps_todetailaset_modal(position) {
    var tileLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var infoIcon = L.icon({
        iconUrl: base_url+ 'dist/img/icon-maps.png', iconSize: [64,64]
    });
    var str_latLng=position.split(","), koord_lat=str_latLng[0], koord_lng=str_latLng[1];
    var map = new L.Map('detailLokasi_maps', {
        'center': [koord_lat,koord_lng], 'zoom': 15, 'layers': [tileLayer]
    });
    var marker = L.marker([koord_lat,koord_lng],{icon:infoIcon}).addTo(map);
}

// ===>>  SIMULATOR PACKAGE <<===//
function load_filedok(url_file){
    if(url_file==''){
        //Upload File
        $("#file_aset").fileinput({
            maxFileSize: 11120, //10Mb
            language: "id", showUpload: false, dropZoneEnabled: false,
            allowedFileExtensions: ["pdf", "jpg", "jpeg", "png"], browseClass: "btn btn-dark btn-file btn-square rounded-right",
            browseLabel: "Cari File...", showCancel: false, removeLabel: "Hapus"
        }),
        $('#file_aset_view').html('').hide();
    }else{
        //Upload File
        $("#file_aset").fileinput({
            maxFileSize: 11120, //10Mb
            language: "id", showUpload: false, dropZoneEnabled: false,
            allowedFileExtensions: ["pdf", "jpg", "jpeg", "png"], browseClass: "btn btn-dark btn-file btn-square rounded-right",
            browseLabel: "Cari File...", showCancel: false, removeLabel: "Hapus"
        });
        var setToView = `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="` +url_file+ `" height="100%" frameborder="0">Your browser does not support open file <code>` +url_file+ `</code>.</iframe></div>`;
        $('#file_aset_view').html(setToView).show();
    }
}
//Load Addons to Form Aset
function load_formaddons(){
    //Lock Space
	$('.nospace').on('keypress', function (e) {
		return e.which !== 32;
	});
    $('#tahun_pengadaan').mask('0000'), $('.numberOnlyMax6').mask('000000'), $('.rp').mask("#.##0", {reverse: true}),
    //Years Picker
    $("#tahun_pengadaan").datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        language: "id",
    }),
    //Spesifikasi Input
    $('#spesifikasi_aset').summernote({
        placeholder: 'Isi spesifikasi aset...',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['link']], ['view', ['codeview']]
        ],
        height: 250, minHeight: null, maxHeight: null, dialogsInBody: true, focus: false, popatmouse: false
    });
}
//Load Thumb Aset
function _loadDropifyFile(url_file, paramsId) {
    if (url_file == "") {
        let drEvent1 = $(paramsId).dropify({
            defaultFile: '',
        });
        drEvent1 = drEvent1.data('dropify');
        drEvent1.resetPreview();
        drEvent1.clearElement();
        drEvent1.settings.defaultFile = '';
        drEvent1.destroy();
        drEvent1.init();
    } else {
        let drEvent1 = $(paramsId).dropify({
            defaultFile: url_file,
        });
        drEvent1 = drEvent1.data('dropify');
        drEvent1.resetPreview();
        drEvent1.clearElement();
        drEvent1.settings.defaultFile = url_file;
        drEvent1.destroy();
        drEvent1.init();
    }
}
//begin::Dropify
$('.dropify-upl').dropify({
    messages: {
        'default': '<span class="btn btn-sm btn-secondary">Drag/ drop file atau Klik disini</span>',
        'replace': '<span class="btn btn-sm btn-primary"><i class="fas fa-upload"></i> Drag/ drop atau Klik untuk menimpa file</span>',
        'remove':  '<span class="btn btn-sm btn-danger"><i class="las la-trash-alt"></i> Reset</span>',
        'error':   'Ooops, Terjadi kesalahan pada file input'
    }, error: {
        'fileSize': 'Ukuran file terlalu besar, Max. ( {{ value }} )',
        'minWidth': 'Lebar gambar terlalu kecil, Min. ( {{ value }}}px )',
        'maxWidth': 'Lebar gambar terlalu besar, Max. ( {{ value }}}px )',
        'minHeight': 'Tinggi gambar terlalu kecil, Min. ( {{ value }}}px )',
        'maxHeight': 'Tinggi gambar terlalu besar, Max. ( {{ value }}px )',
        'imageFormat': 'Format file tidak diizinkan, Hanya ( {{ value }} )'
    }
});
//end::Dropify
// ===>>  END SIMULATOR PACKAGE <<===//


//Clear Form data
const _clearFormAset = () => {
    if (save_method == "" || save_method == "add_aset") {
        $('#form-aset1')[0].reset(), 
        $('[name="id"]').val(''),
        // $('[name="id_aset"]').val(''), 
        // $('[nama="kode_aset_uplfile"]').val(''), 
        $('[name="methodform_aset"]').val(''), 
        $('#spesifikasi_aset').summernote('code', ''), 
        $('.selectpicker').selectpicker('val', ''), 
        $('#tahun_pengadaan').datepicker('update', ''),
        $('#true_koordinat_aset').prop("checked", false), 
        $('#koord_lat').val(''), 
        $('#koord_lng').val(''), 
        // $('#col-lokasiAset_map').html(''), 
        // $('.hideMaps').hide(), 
        _loadDropifyFile('', '#thumbnail');
    } else {
        let id = $('[name="id"]').val();
        _edit_aset(id);
    }
}
//Button Reset Form Aset
$('#btn-reset1').click(function (e){
    e.preventDefault();
    _clearFormAset();
});
//Close Form Aset
function _closeFormAset() {
    save_method = '';
    _clearFormAset(), $('#col-formAset .card-header .card-title').html(''), $('#col-formAset').hide(), $('#col-dtAset').show();
}
//Add Aset
function _add_aset(){
    save_method = "add_aset";
    $('#formAset-tabs li.nav-item .nav-link').removeClass('active'), $('#tabs-formAset1').addClass('active'), $('#tabs-formAset2').addClass('disabled');
    $('#formAset-tabsContent .tab-pane').removeClass('show active'), $('#formAset1').addClass('show active');

    load_formaddons(),_clearFormAset(), _loadDropifyFile('', '#thumbnail'),loadcheckbox_koordinataset(),$('.hideMaps').hide();
    $("#col-formAset .card-header .card-title").html(
        `<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-window-plus fs-2 text-gray-900 me-2"></i>Form Tambah Data Aset</h3>`
    ),
    $("#col-dtAset").hide(), $("#col-formAset").show();
}

// ===>>FOR ADDING NEW ( JENIS,SATUAN,STATUS ) ASET <<===//
//Load Add New Jenis Aset
function addNewJenisAset(){
    //Mask Js
    $('.mask-12').mask('000000000000');
    //Lock Space
    $('.no-space').on('keypress', function (e) {
        return e.which !== 32;
    });
    $('#sample_iconjenis_aset').html('...'), $('#form-newJenis')[0].reset();
    $('[name="methodform_jenisaset"]').val('add'), $('#newjenisModal .modal-header .modal-title').html('<i class="flaticon2-plus text-dark"></i> Form Tambah Data Jenis Aset'), $('#newjenisModal').modal('show');
}
//Cek Icon Jenis Aset
$("#iconjenis_aset").on("change",function(){
    var textIcon = $(this).val();
    if(textIcon==''){
        $('#sample_iconjenis_aset').html('...');
    }else{
        $('#sample_iconjenis_aset').html('<i class="bi bi-' +textIcon+ ' fs-1"></i>');
    }
});
//Save Data New Jenis Aset
$('#btn-saveJenis').click(function (e) {
    e.preventDefault();
    $("#btn-saveJenis").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Menyimpan data...').attr("disabled", true);

    var url;
    var kode_jenis_aset = $('#kode_jenis_aset');
    var jenis_aset = $('#jenis_aset');
    var deskjenis_aset = $('#deskjenis_aset');
    var iconjenis_aset = $('#iconjenis_aset');

    if (kode_jenis_aset.val() == '') {
        toastr.error('Kode Jenis Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        kode_jenis_aset.focus();
        $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (jenis_aset.val() == '') {
        toastr.error('Nama Jenis Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        jenis_aset.focus();
        $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (deskjenis_aset.val() == '') {
        toastr.error('Deskripsi Jenis Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        deskjenis_aset.focus();
        $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (iconjenis_aset.val() == '') {
        toastr.error('Icon Jenis Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        iconjenis_aset.focus();
        $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }

    url = BASE_URL+ "/ajax/new_jenis_aset_save";
    var formData = new FormData($('#form-newJenis')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
            $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);

            if (data.status == true) {
                Swal.fire({
                    title: "Success!",
                    text: 'Data jenis aset baru berhasil ditambahkan',
                    icon: "success",
                    allowOutsideClick: false,
                }).then(function (result) {
                     //Load Data
                     loadSelectpicker_jenis();
                     //Clear Form
                     $('#sample_iconjenis_aset').html('...'), $('#form-newJenis')[0].reset(),
                     $('[name="methodform_jenisaset"]').val(''), $('#newjenisModal .modal-header .modal-title').html(''), $('#newjenisModal').modal('hide');
                });
            } else {
                if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error[0],
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } else {
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-saveJenis').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
});
//Load Add New Satuan Aset
function addNewSatuanAset(){
    $('#form-newSatuan')[0].reset(), $('[name="methodform_satuanaset"]').val('add'), $('#newsatuanModal .modal-header .modal-title').html('<i class="flaticon2-plus text-dark"></i> Form Tambah Data Satuan Aset'), $('#newsatuanModal').modal('show');
}
//Save New Data Satuan Aset
$('#btn-saveSatuan').click(function (e) {
    e.preventDefault();
    $("#btn-saveSatuan").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Menyimpan data...').attr("disabled", true);

    var url;
    var satuan_aset = $('#satuan_aset');

    if (satuan_aset.val() == '') {
        toastr.error('Nama Satuan Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        satuan_aset.focus();
        $('#btn-saveSatuan').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }

    url = BASE_URL+ "/ajax/new_satuan_aset_save";
    var formData = new FormData($('#form-newSatuan')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
            $('#btn-saveSatuan').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
            
            if (data.status == true) {
                Swal.fire({
                    title: "Success!",
                    text: 'Data Satuan aset baru berhasil ditambahkan',
                    icon: "success",
                    allowOutsideClick: false,
                }).then(function (result) {
                    //Load Data
                    loadSelectpicker_satuan();
                    //Clear Form
                    $('#form-newSatuan')[0].reset(), $('[name="methodform_satuanaset"]').val(''), $('#newsatuanModal .modal-header .modal-title').html(''), $('#newsatuanModal').modal('hide');
                });
            } else {
                if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error[0],
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } else {
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-saveSatuan').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
});
//Load Add New Status Aset
function addNewStatusAset(){
    $('#sample_iconstatus_aset').html('...'), $('#form-newStatus')[0].reset();
    $('[name="methodform_statusaset"]').val('add'), $('#newstatusModal .modal-header .modal-title').html('<i class="flaticon2-plus text-dark"></i> Form Tambah Data Status Aset'), $('#newstatusModal').modal('show');
}
//Cek Icon Status Aset
$("#iconstatus_aset").on("change",function(){
    var textIcon = $(this).val();
    if(textIcon==''){
        $('#sample_iconstatus_aset').html('...');
    }else{
        $('#sample_iconstatus_aset').html('<i class="bi bi-' +textIcon+ ' fs-1"></i>');
    }
});
//Save New Data Status Aset
$('#btn-saveStatus').click(function (e) {
    e.preventDefault();
    $("#btn-saveStatus").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Menyimpan data...').attr("disabled", true);

    var url;
    var status_aset = $('#status_aset');
    var iconstatus_aset = $('#iconstatus_aset');

    if (status_aset.val() == '') {
        toastr.error('Nama Status Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        status_aset.focus();
        $('#btn-saveStatus').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (iconstatus_aset.val() == '') {
        toastr.error('Icon Status Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        iconstatus_aset.focus();
        $('#btn-saveStatus').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }

    url = BASE_URL+ "/ajax/new_status_aset_save";
    var formData = new FormData($('#form-newStatus')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
            $('#btn-saveStatus').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
            if (data.status == true) {
                Swal.fire({
                    title: "Success!",
                    text: 'Data Status aset baru berhasil ditambahkan',
                    icon: "success",
                    allowOutsideClick: false,
                }).then(function (result) {
                    //Load Data
                    loadSelectpicker_status();
                    //Clear Form
                    $('#sample_iconstatus_aset').html('...'), $('#form-newStatus')[0].reset(),
                    $('[name="methodform_statusaset"]').val(''), $('#newstatusModal .modal-header .modal-title').html(''), $('#newstatusModal').modal('hide');
                });
            } else {
                if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error[0],
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } else {
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }
            }     
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-saveStatus').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
});
// close all modal
function _closeModal(){
    $('#newjenisModal').modal('hide');
    $('#newsatuanModal').modal('hide');
    $('#newstatusModal').modal('hide');
    $('#detailasetModal').modal('hide');
    $('#modalImportAset').modal('hide');
}
// ===>> END  ADDING NEW ( JENIS,SATUAN,STATUS ) ASET <<===//

//If Checked Checkbox Form Data Aset
function loadcheckbox_koordinataset() {
    $('#true_koordinat_aset').change(function () {
        var konfirKoordinat = document.getElementById("true_koordinat_aset");
        if (konfirKoordinat.checked == true){
            $('#col-lokasiAset_map').html('<div id="lokasiAset_map" style="height: 350px;"></div>'), getLocationUser(), $('.hideMaps').show();
        } else {
            $('#koord_lat').val(''), $('#koord_lng').val(''),
            $('#col-lokasiAset_map').html(''), $('.hideMaps').hide();
        }
    });
}
//Cek Geolocation by User
function getLocationUser() {
    var x = document.getElementById("geolocationInfo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadmaps_koordinataset);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//Load Maps Lokasi Aset
function loadmaps_koordinataset(position) {
    var tileLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var infoIcon = L.icon({
        iconUrl: base_url+ 'dist/img/icon-maps.png',
        iconSize: [64,64]
    });
    var latCoords;
    var lngCoords;
    if(position==''){
        latCoords = document.getElementById('koord_lat').value;
        lngCoords = document.getElementById('koord_lng').value;
    }else{
        latCoords = position.coords.latitude;
        lngCoords = position.coords.longitude;
        latCoords = document.getElementById('koord_lat').value = latCoords;
        lngCoords = document.getElementById('koord_lng').value = lngCoords;
    }
    var map = new L.Map('lokasiAset_map', {
        'center': [latCoords,lngCoords],
        'zoom': 20,
        'layers': [tileLayer]
    });
    var marker = L.marker([latCoords,lngCoords],{
        icon:infoIcon,
        draggable: true
    }).addTo(map);
    map.on("click",function(e){
        var lat=e.latlng.lat;
        var lng=e.latlng.lng;
        if(!marker){
            marker = L.marker(e.latlng).addTo(map)
        }else{
            marker.setLatLng(e.latlng);
        }
        document.getElementById('koord_lat').value = lat;
        document.getElementById('koord_lng').value = lng;
    });
    marker.on('dragend', function (e) {
        document.getElementById('koord_lat').value = marker.getLatLng().lat;
        document.getElementById('koord_lng').value = marker.getLatLng().lng;
    });
}
//Edit Aset
function _edit_aset(idp)
{
    let target = document.querySelector("#col-dtAset"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block();blockUi.destroy();
    save_method = 'update_aset';
    $('#formAset-tabs li.nav-item .nav-link').removeClass('active disabled'), $('#tabs-formAset1').addClass('active'),
    $('#formAset-tabsContent .tab-pane').removeClass('show active'), $('#formAset1').addClass('show active');

    load_formaddons(), $('#form-aset1')[0].reset(), $('[name="methodform_aset"]').val('update'), $('#spesifikasi_aset').summernote('code', ''), $('.selectpicker').selectpicker('val', ''), $('#tahun_pengadaan').datepicker('update', ''),  _loadDropifyFile('', '#thumbnail'), loadcheckbox_koordinataset(), $('.hideMaps').hide();
    //Ajax Load data from ajax
    $.ajax({
        url : BASE_URL+ "/ajax/ajax_edit_aset",
        type: "GET",
        dataType: "JSON",
        data: {
            idp
        },success: function(data)
        {
            blockUi.release(), blockUi.destroy(); 
            if(data.status==true){
                $('[name="id"]').val(data.id), $('[name="id_aset"]').val(data.id), $('[name="kode_aset_uplfile"]').val(data.kode),
                 $('#kode_aset').val(data.kode), $('#nama_aset').val(data.nama),load_filedtaset(data.id, 'form'),
                $('#fid_unit_kerja').selectpicker('val', data.fid_unit_kerja), $('#no_registrasi').val(data.no_registrasi), $('#volume_aset').val(data.volume),
                $('#jumlah_aset').val(data.jumlah), $('#fid_satuan').selectpicker('val', data.fid_satuan), $('#tipe_aset').val(data.type), $('#lokasi_aset').val(data.lokasi);
                if(data.lat_lng==null || data.lat_lng==''){
                    console.log('null');
                }else{
                    $('#true_koordinat_aset').prop("checked", true);
                    var str_latLng=data.lat_lng.split(","), koord_lat=str_latLng[0], koord_lng=str_latLng[1];
                    $('#koord_lat').val(koord_lat), $('#koord_lng').val(koord_lng), $('#col-lokasiAset_map').html('<div id="lokasiAset_map" style="height: 350px;"></div>'), loadmaps_koordinataset(''), $('.hideMaps').show();
                }
                $('#tahun_pengadaan').datepicker('update', data.tahun_pengadaan), $('#harga_pengadaan').val(data.hargapengadaan), $('#harga_sekarang').val(data.hargasekarang),
                _loadDropifyFile(data.urlThumbnail, '#thumbnail');
                //Summernote Spesifikasi
                var spesifikasi = data.spesifikasi;
                $('#spesifikasi_aset').summernote('code', spesifikasi), $('#fid_status').selectpicker('val', data.fid_status),
                $('#col-formAset .card-header .card-title').html('<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-pencil-square fs-2 text-gray-900 me-2"></i>Form Edit Data Aset</h3>');
                
                // for selection jenis aset
                $('select[name=fid_jenis]').val(data.fid_jenis),
                $('.selectpicker').selectpicker('refresh');
                // for selection status aset
                $('select[name=fid_status]').val(data.fid_status),
                $('.selectpicker').selectpicker('refresh');
                // for selection unit kerja
                $('select[name=fid_unit_kerja]').val(data.fid_unit_kerja),
                $('.selectpicker').selectpicker('refresh');
                // for selection satuan aset
                $('select[name=fid_satuan]').val(data.fid_satuan),
                $('.selectpicker').selectpicker('refresh');

                // open form and close table data aset
                $('#col-dtAset').hide(), $('#col-formAset').show();
            }else{
                swal.fire("Ooops!", "Terjadi kesalahan periksa koneksi internet lalu coba kembali!", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            blockUi.release(), blockUi.destroy(); 
            console.log('Load data is error!');
            swal.fire("Ooops!", "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang!", "error");
        }
    });
}
//Save Data Aset
$('#btn-save1').click(function (e) {
    e.preventDefault();
    $("#btn-save1").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Menyimpan data...').attr("disabled", true);

    var url;
    var jenis = $('#fid_jenis');
    var kode_aset = $('#kode_aset');
    var nama_aset = $('#nama_aset');
    var unitkerja = $('#fid_unit_kerja');
    var no_registrasi = $('#no_registrasi');
    var volume_aset = $('#volume_aset');
    var jumlah_aset = $('#jumlah_aset');
    var satuan = $('#fid_satuan');
    var tipe_aset = $('#tipe_aset');
    var lokasi_aset = $('#lokasi_aset');
    var tahun_pengadaan = $('#tahun_pengadaan');
    var harga_pengadaan = $('#harga_pengadaan');
    var harga_sekarang = $('#harga_sekarang');

    var thumbnail = $('#thumbnail');
    var thumbnail_preview = $('#fg-thumbnail .dropify-preview .dropify-render').html();

    var spesifikasi_aset = $('#spesifikasi_aset');
    var status = $('#fid_status');

    if (jenis.val() == '') {
        toastr.error('Jenis aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fidjenis button').removeClass('btn-light').addClass('btn-danger').stop().delay(1500).queue(function () {
			$(this).removeClass('btn-danger').addClass('btn-light');
		});
        jenis.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (kode_aset.val() == '') {
        toastr.error('NUP aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        kode_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (nama_aset.val() == '') {
        toastr.error('Nama aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        nama_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (unitkerja.val() == '') {
        toastr.error('Unit Kerja masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fidunitkerja button').removeClass('btn-light').addClass('btn-danger').stop().delay(1500).queue(function () {
			$(this).removeClass('btn-danger').addClass('btn-light');
		});
        unitkerja.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (no_registrasi.val() == '') {
        toastr.error('No. Registrasi aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        no_registrasi.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (volume_aset.val() == '') {
        toastr.error('Volume aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        volume_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (jumlah_aset.val() == '') {
        toastr.error('Jumlah aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        jumlah_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (satuan.val() == '') {
        toastr.error('Satuan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fidsatuan button').removeClass('btn-light').addClass('btn-danger').stop().delay(1500).queue(function () {
			$(this).removeClass('btn-danger').addClass('btn-light');
		});
        satuan.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (tipe_aset.val() == '') {
        toastr.error('Tipe aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        tipe_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (lokasi_aset.val() == '') {
        toastr.error('Lokasi aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        lokasi_aset.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (tahun_pengadaan.val() == '') {
        toastr.error('Tahun pengadaan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        tahun_pengadaan.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (harga_pengadaan.val() == '') {
        toastr.error('Harga pengadaan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        harga_pengadaan.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (harga_sekarang.val() == '') {
        toastr.error('Harga sekarang aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        harga_sekarang.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (thumbnail_preview == '') {
        toastr.error('Gambar/ Foto Thumbnail aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-thumbnail .dropify-wrapper').addClass('border-2 border-danger').stop().delay(1500).queue(function () {
            $(this).removeClass('border-2 border-danger');
        });
        thumbnail.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (spesifikasi_aset.summernote('isEmpty')) {
        toastr.error('Spesifikasi aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        spesifikasi_aset.summernote('focus');
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (status.val() == '') {
        toastr.error('Status aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fidstatus button').removeClass('btn-light').addClass('btn-danger').stop().delay(1500).queue(function () {
			$(this).removeClass('btn-danger').addClass('btn-light');
		});
        status.focus();
        $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    url = BASE_URL+ "/ajax/data_aset_save";
    if(save_method == 'update_aset') {
        url = BASE_URL+ "/ajax/data_aset_update";
    }
    var formData = new FormData($('#form-aset1')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
            $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);

            if (data.status == true) {
                if(save_method == 'add_aset'){
                    Swal.fire({
                        title: "Success!",
                        text: 'Data aset baru berhasil ditambahkan....',
                        icon: "success",
                        allowOutsideClick: false,
                    }).then(function (result) {
                        //Load Data
                        _loadDataAset();
                        //To Form Upload File
                        save_method = 'update_aset';
                        $('[name="id"]').val(data.idp_aset), $('[name="methodform_aset"]').val('update'), $('[name="id_aset"]').val(data.idp_aset), $('[name="kode_aset_uplfile"]').val(data.kode_aset), load_filedtaset(data.idp_aset, 'form'),
                        $('#formAset-tabs li.nav-item .nav-link').removeClass('active'), $('#tabs-formAset2').addClass('active'), $('#formAset-tabs li.nav-item .nav-link').removeClass('disabled'),
                        $('#formAset-tabsContent .tab-pane').removeClass('show active'), $('#formAset2').addClass('show active');
                    });
                }else{
                    Swal.fire({
                        title: "Success!", text: "Data Aset berhasil diperbarui...", icon: "success"
                    }).then(function (result) {
                        //Load Data
                        _loadDataAset();
                    });
                }
            } else {
                if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error[0],
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } else {
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }
            }  
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-save1').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);

            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
});


// ==========>> FOR FILE ASET SAVE <<===========//

//Kelola File Data Aset
function _kelolaFile(idp){
    let target = document.querySelector("#col-dtAset"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block();blockUi.destroy();
    save_method = 'update_aset';
    load_formaddons(), $('#form-aset1')[0].reset(), $('[name="methodform_aset"]').val('update'), $('#spesifikasi_aset').summernote('code', ''), $('.selectpicker').selectpicker('val', ''), $('#tahun_pengadaan').datepicker('update', ''),  _loadDropifyFile('', '#thumbnail'), loadcheckbox_koordinataset(), $('.hideMaps').hide();
    //Ajax Load data from ajax
    $.ajax({
        url : BASE_URL+ "/ajax/ajax_edit_aset",
        type: "GET",
        dataType: "JSON",
        data: {
            idp
        },success: function(data)
        {
            blockUi.release(), blockUi.destroy();
            if(data.status==true){
                $('[name="id"]').val(data.id), $('[name="id_aset"]').val(data.id), $('[name="kode_aset_uplfile"]').val(data.kode), $('#kode_aset').val(data.kode), $('#nama_aset').val(data.nama),
                $('#no_registrasi').val(data.no_registrasi), $('#volume_aset').val(data.volume),
                $('#jumlah_aset').val(data.jumlah), $('#tipe_aset').val(data.type), $('#lokasi_aset').val(data.lokasi);
                if(data.lat_lng==null || data.lat_lng==''){
                    console.log('null');
                }else{
                    $('#true_koordinat_aset').prop("checked", true);
                    var str_latLng=data.lat_lng.split(","), koord_lat=str_latLng[0], koord_lng=str_latLng[1];
                    $('#koord_lat').val(koord_lat), $('#koord_lng').val(koord_lng), $('#col-lokasiAset_map').html('<div id="lokasiAset_map" style="height: 350px;"></div>'), loadmaps_koordinataset(''), $('.hideMaps').show();
                }
                $('#tahun_pengadaan').datepicker('update', data.tahun_pengadaan), $('#harga_pengadaan').val(data.hargapengadaan), $('#harga_sekarang').val(data.hargasekarang),
                _loadDropifyFile(data.urlThumbnail, '#thumbnail');
                //Summernote Spesifikasi
                var spesifikasi = data.spesifikasi;
                $('#spesifikasi_aset').summernote('code', spesifikasi),
                $('#col-formAset .card-header .card-title').html('<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-pencil-square fs-2 text-gray-900 me-2"></i>Form Edit Data Aset</h3>');

                $('#formAset-tabs li.nav-item .nav-link').removeClass('active disabled'), 
                $('#tabs-formAset2').addClass('active'), 
                $('#formAset-tabsContent .tab-pane').removeClass('show active'), 
                $('#formAset2').addClass('show active'), 
                load_filedtaset(data.id, 'form');
                $('#col-dtAset').hide(), $('#col-formAset').show();

                // for selection jenis aset
                $('select[name=fid_jenis]').val(data.fid_jenis),
                $('.selectpicker').selectpicker('refresh');
                // for selection status aset
                $('select[name=fid_status]').val(data.fid_status),
                $('.selectpicker').selectpicker('refresh');
                // for selection unit kerja
                $('select[name=fid_unit_kerja]').val(data.fid_unit_kerja),
                $('.selectpicker').selectpicker('refresh');
                // for selection satuan aset
                $('select[name=fid_satuan]').val(data.fid_satuan),
                $('.selectpicker').selectpicker('refresh');
            }else{
                swal.fire("Ooops!", "Terjadi kesalahan periksa koneksi internet lalu coba kembali!", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            blockUi.release(), blockUi.destroy();
            console.log('Load data is error!');
            swal.fire("Ooops!", "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang!", "error");
        }
    });
}

//ADD & UPLOAD FILE DATA ASET
$('#btnAdd_fileDataAset').click(function (e) {
    e.preventDefault();
    $('#btnAdd_fileDataAset').hide(),
    $('[name="namafile_aset"]').val(''),
    load_filedok('');
    // _loadDropifyFile('', '#file_aset');
    $('#row-formFileAset').show(), $('#namafile_aset').focus();
});
//CLOSE FORM UPLOAD FILE DATA ASET
$('#btn-batalUploadFileAset').click(function (e) {
    e.preventDefault();
    $('[name="namafile_aset"]').val(''),
    load_filedok(''),
    $('#btnAdd_fileDataAset').show(), $('#row-formFileAset').hide();
})
//Save File Data Aset
$('#btn-save2').click(function (e) {
    e.preventDefault();
    $("#btn-save2").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Menyimpan data...').attr("disabled", true);

    var url;
    var namafile_aset = $('#namafile_aset');
    var file_aset = $('#file_aset');
    // var fileAset_preview = $('#fg-fileAset .dropify-preview .dropify-render').html();

    if (namafile_aset.val() == '') {
        toastr.error('Nama file data aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        namafile_aset.focus();
        $('#btn-save2').html('<i class="fas fa-upload"></i> Upload').attr('disabled', false);
        return false;
    }
    if (file_aset.val() == '') {
        toastr.error('File data aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fileAset .file-input').addClass('file-input-error').stop().delay(2500).queue(function(){
            $(this).removeClass('file-input-error');
        });
        file_aset.focus();
        $('#btn-save2').html('<i class="fas fa-upload"></i> Upload').attr('disabled', false);
        return false;
    }

    url = BASE_URL+ "/ajax/file_aset_save";
    var formData = new FormData($('#form-aset2')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
            $('#btn-save2').html('<i class="fas fa-upload"></i> Upload').attr('disabled', false);
            if (data.status == true) {
                Swal.fire({
                    title: "Success!", text: "File data aset berhasil ditambahkan...", icon: "success"
                }).then(function (result) {
                    //Load Data
                    reload_filedtaset(),$('[name="namafile_aset"]').val(''),load_filedok(''), $('#btnAdd_fileDataAset').show(), $('#row-formFileAset').hide();
                });
            } else {
                if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error[0],
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }else if(data.pesan_code=='format_inputan') {   
                    Swal.fire({
                        title: "Ooops!",
                        html: data.pesan_error,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                }else{
                    Swal.fire("Ooops!", "Gagal melakukan proses data, mohon cek kembali isian pada form yang tersedia.", "error");
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-save2').html('<i class="fas fa-upload"></i> Upload').attr('disabled', false);
            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
});
//Hapus File Data Aset
function _hapus_fileaset(idp) {
    Swal.fire({
        title: "",
        text: "Yakin ingin menghapus File ini?",
        icon: "question",
        confirmButtonText: "Yakin",
        showCancelButton: true,
        cancelButtonText: "Batal"
    }).then(result => {
        if (result.value) {
            // ajax delete data to database
            let target = document.querySelector("#col-dtAset"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
            blockUi.block();blockUi.destroy();

            $.ajax({
                url : BASE_URL+ "/ajax/delete_file-aset",
                headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                type: "POST",
                dataType: "JSON",
                data: {
                    'idp': idp
                },
                success: function(data){
                    blockUi.release(), blockUi.destroy(); 
                    if(data.status==true){
                        Swal.fire({title: "Success!", text: "File data aset berhasil dihapus...", icon: "success"}).then(function(result){
                            reload_filedtaset();
                        });
                    }else{
                        Swal.fire("Ooops!", "Gagal melakukan penghapusan data, periksa koneksi internet anda lalu coba kembali.", "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown){
                    blockUi.release(), blockUi.destroy(); 
                    Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang...", icon: "error"}).then(function(result){
                        console.log("Load data is error!");
                        reload_filedtaset();
                    });
                }
            });
        }
    });
}

// ===== FOR IMPORT DATA ASET ======== //
//load form import data aset
function _importDataAset(){
    $('#form-import')[0].reset(), $('#modalImportAset .modal-header .modal-title').html('<i class="bi bi-cloud-upload-fill fs-2 align-middle me-2 text-dark"></i> Form Import Data Aset'), $('#modalImportAset').modal('show');
    _loadDropifyFile('', '#file_excel')
}

$('#btn-saveImport').click(function (e) {
    $("#btn-saveImport").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Memproses data...').attr("disabled", true);

    var fileexcel = $('#file_excel');
    var fileexcel_priview = $('#fg-fileAset .dropify-preview .dropify-render').html();

    if (fileexcel.val() == '') {
        toastr.error('File import masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fileAset .dropify-wrapper').addClass('border-2 border-danger').stop().delay(1500).queue(function () {
            $(this).removeClass('border-2 border-danger');
        });
        fileexcel.focus();
        $('#btn-saveImport').html('<i class="la la-download"></i> Import').attr('disabled', false);
        return false;
    }
    
    url = BASE_URL+ "/ajax/import_data_excel";
    var formData = new FormData($('#form-import')[0]);
    $.ajax({
        url: url,
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON", 
        success: function (data) {
            $('#btn-saveImport').html('<i class="la la-download"></i> Import').attr('disabled', false);
            
            if (data.status==true){ 
                Swal.fire({
                    icon: 'success', 
                    text: 'Impord data berhasil dilakukan. Terima kasih!',  
                    confirmButtonText: 'Selesai!', 
                }).then((result) => {  
                    _loadDataAset(), _closeModal();
                });  
            }else{  
                if(data.errors) { 
                    Swal.fire({
                        title: "Ooops!",
                        text: data.errors,
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } else { 
                    Swal.fire({
                        title: "Terjadi Kesalahan!",
                        text: 'Pastikan Anda melengkapi form dengan benar. Terima kasih!',
                        icon: "warning",
                        allowOutsideClick: false,
                    });
                } 
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            $('#btn-saveImport').html('<i class="la la-download"></i> Import').attr('disabled', false);
            Swal.fire({title: "Ooops!", text: "Terjadi kesalahan yang tidak diketahui, mohon hubungi pengembang.", icon: "error"
            }).then(function (result) {
                console.log('Load data form is error!');
            });
        }
    });
})