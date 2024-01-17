//Class Definition
var save_method;
var table;

//Class Initialization
jQuery(document).ready(function() {
    _loadDataPerawatan();
    loadSelectpicker_jenis();
    load_formaddons();

     //FLATPICKER OPTIONS
     var startDate = $('#filterDt-startDate').val(), endDate = $('#filterDt-endDate').val();
     $("#filterDt-startDate").flatpickr({
         defaultDate: startDate,
         dateFormat: "d/m/Y"
     });
     $("#filterDt-endDate").flatpickr({
         defaultDate: endDate,
         dateFormat: "d/m/Y"
     });

    // toggle dropdown
    $('.dropdown-export').click(function(){
        $('.dropdown-export-menu').toggleClass('show');
    });
    $(window).click(function() {
        $('.dropdown-export-menu').removeClass('show');
    });
});
/*************************
    Load jenis filter aset
*************************/
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
/*************************
    OnChange Select Master Jenis Aset on DT
*************************/
$('#filterDt-jenisAset').change(function () {
    //var idp = $(this).val();
    reload_dtperawatanaset();
});
/*************************
    OnChange Date Range
*************************/
$('.date-flatpickr').change(function () {
    reload_dtperawatanaset();
});
/*************************
    OnChange Aset for Form Perawatan Aset
*************************/
$('#fid_aset').change(function () {
    var idp = $(this).val();
    if(idp=='' || idp==null){
        $('#dtl_dataAset').html('');
    }else{
        $('#dtl_dataAset').html(''), loadDtl_dataAset(idp);
    }
});

// RESET FILTER DATA TABLE
$('#btnResetFilter').on('click', function (e) {
    e.preventDefault();
    $("#filterDt-startDate").flatpickr({
        defaultDate: "today",
        dateFormat: "d/m/Y"
    });
    $("#filterDt-endDate").flatpickr({
        defaultDate: "today",
        dateFormat: "d/m/Y"
    });
    $('#filterDt-jenisAset').selectpicker('val', '');
    reload_dtperawatanaset();
});

//Load Datatables banner
const _loadDataPerawatan = () => {
    table = $('#dt-perawatanAset').DataTable({
        buttons: [{
            extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },{
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },{
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
            //'print', 'excelHtml5', 'excelHtml5'
        ],
        searchDelay: 300,
        processing: true,
        serverSide: true,
        ajax: {
            url: BASE_URL+ '/ajax/load_perawatan_aset',
            headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            type: 'POST',
            data: function ( data ) {
                data.fid_jenis= $('#filterDt-jenisAset').val();
                data.tgl_start= $('#filterDt-startDate').val();
                data.tgl_end= $('#filterDt-endDate').val();
            }
        },
        destroy: true,
        draw: true,
        search:false,
        deferRender: true,
        responsive: false,
        autoWidth: false,
        LengthChange: true,
        paginate: true,
        pageResize: true,
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'jenis_aset', name: 'jenis_aset'},
            { data: 'data_aset', name: 'data_aset'},
            { data: 'unit_kerja', name: 'unit_kerja'},
            { data: 'tgl_perawatan', name: 'tgl_perawatan'},
            { data: 'foto', name: 'foto'},
            { data: 'action', name: 'action'},
        ],
        columnDefs: [
            { "width": "5%", "targets": 0, "className": "text-center align-top" },
            { "width": "20%", "targets": 1, "className": "align-top" },
            { "width": "20%", "targets": 2, "className": "align-top"},
            { "width": "20%", "targets": 3, "className": "align-top"},
            {"width": "10%", "targets": 4, "className": "text-center align-top"},
            {"width": "10%", "targets": 5, "className": "text-center align-top", "orderable": false , "searchable": false},
            {"width": "5%", "targets": 6, "className": "text-center  align-top", "orderable": false , "searchable": false},

        ],
        oLanguage: {
            sEmptyTable: "Tidak ada Data yang dapat ditampilkan..",
            sInfo: "Menampilkan _START_ s/d _END_ dari _TOTAL_",
            sInfoEmpty: "Menampilkan 0 - 0 dari 0 entri.",
            sInfoFiltered: "",
            sProcessing: `<div class="d-flex justify-content-center align-items-center"><span class="spinner-border align-middle me-3"></span> Mohon Tunggu...</div>`,
            sZeroRecords: "Tidak ada Data yang dapat ditampilkan..",
            sLengthMenu: `<select class="mb-2 show-tick form-select-solid" data-width="fit" data-style="btn-sm btn-secondary" data-container="body">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="-1">Semua</option>
            </select>`,
            oPaginate: {
                sPrevious: "Sebelumnya",
                sNext: "Selanjutnya",
            },
        },
        "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        fnDrawCallback: function (settings, display) {
            $('[data-bs-toggle="tooltip"]').tooltip("dispose"), $(".tooltip").hide();
            //Custom Table
            $('#dt-perawatanAset_length select').addClass('form-control form-control-sm').selectpicker()

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
        },
    });
    $('#dt-perawatanAset').css('width', '100%').DataTable().columns.adjust().draw();
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
//Refresh Datatables Perawatan Aset
function reload_dtperawatanaset(){
	$('#dt-perawatanAset').DataTable().ajax.reload(), $('#dt-perawatanAset').css('width', '100%').DataTable().columns.adjust().draw();
}
// ===>>  SIMULATOR PACKAGE <<===//
//Load Addons to Form Aset
function load_formaddons(){
    //Lock Space
	$('.nospace').on('keypress', function (e) {
		return e.which !== 32;
	});
    $('.numberOnlyMax6').mask('000000'), $('.rp').mask("#.##0", {reverse: true}),
    //Years Picker
    $("#tanggal_perawatan").flatpickr({
        defaultDate: $("#tanggal_perawatan").val(),
        dateFormat: "d/m/Y"
    });
    //Spesifikasi Input
    $('#keterangan_perawatan').summernote({
        placeholder: 'Isi keterangan pemeriksaan aset...',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['link']], ['view', ['codeview']]
        ],
        height: 250, minHeight: null, maxHeight: null, dialogsInBody: true, focus: false, popatmouse: false
    });

    //Get Aset Select Custom
    $('#fid_aset').select2({
        width: '100%',
        allowClear: true,
        ajax: {
            url: BASE_URL+ "/select/ajax_getdtaset",
            dataType: 'json',
            data: function(params, page) {
                return {
                    term: params.term,
                    page: page
                }
            },
            processResults: function (data, params) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.text
                        }
                    })
                };
            },
            cache: true
        },
        language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
        placeholder: 'Pilih Aset...',
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

//Get Detail Data Aset for Form Perawatan Aset
function loadDtl_dataAset(idp) {
    let target = document.querySelector("#card-form"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block(), blockUi.destroy();
    //Ajax Load data from ajax
    $.ajax({
        url : BASE_URL+ "/app_admin/get_data_aset_on_select",
        type: "GET",
        dataType: "JSON",
        data:{
            idp
        },success: function(data)
        {
            if(data.status==true){
                //load_filethumbnailpegawai(data.urlPegawaiThumb),
                var mapsLocation;
                if(data.lat_lng==null || data.lat_lng==''){
                    mapsLocation = '';
                }else{
                    mapsLocation = `<div class="d-flex flex-column flex-root mb-3">
                        <span class="opacity-70 mb-2">Titik Koordinat: </span>
                        <span class="d-block mb-3"><div id="detailLokasi_maps_edit" style="height: 200px;"></div></span>
                        <span class="font-weight-bolder">` +data.lat_lng+ `</span>
                    </div>`;
                }
                var divDetailAset = `<div class="col-lg-12">
                <div class="alert alert alert-success d-block fadeIn mb-10" role="alert">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <h3 class="font-weight-normal">Data Aset</h3>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Jenis: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.jenis_aset+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Nama: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.nama+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Kode: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.kode+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Tipe: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.type+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">No. Registrasi: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.no_registrasi+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Unit Kerja: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.unit_kerja+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Tahun Pengadaan: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.tahun_pengadaan+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Harga Pengadaan (Rp.): </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.hargapengadaan+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Harga Sekarang (Rp.): </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.hargasekarang+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Volume: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.volume+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Jumlah: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.jumlah+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Satuan: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.satuan_aset+ `</span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Lokasi: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.lokasi+ `</span>
                            </div>
                            ` +mapsLocation+ `
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Spesifikasi: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.spesifikasi+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">status: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.status_aset+ `</span>
                            </div>
                        </div>
                    </div>
                </div></div>`;
                $('#dtl_dataAset').html(divDetailAset);
                if(data.lat_lng==null || data.lat_lng==''){
                    console.log('null');
                }else{
                    loadmaps_todetailaset_edit(data.lat_lng);
                }
                blockUi.release(), blockUi.destroy();
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
function loadmaps_todetailaset_edit(position) {
    var tileLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var infoIcon = L.icon({
        iconUrl: base_url+ 'dist/img/icon-maps.png', iconSize: [64,64]
    });
    var str_latLng=position.split(","), koord_lat=str_latLng[0], koord_lng=str_latLng[1];
    var map = new L.Map('detailLokasi_maps_edit', {
        'center': [koord_lat,koord_lng], 'zoom': 15, 'layers': [tileLayer]
    });
    var marker = L.marker([koord_lat,koord_lng],{icon:infoIcon}).addTo(map);
}

// Load Detail Data
function _detail_aset(idp){
    let target = document.querySelector("#card-form"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block(), blockUi.destroy();
    //Ajax Load data from ajax
    $.ajax({
        url : BASE_URL+ "/ajax/load_detail_perawatan",
        type: "GET",
        dataType: "JSON",
        data: {
            idp
        },success: function(data)
        {
            if(data.status==true){
                var divDetailAset = `<div class="col-lg-12">
                <div class="alert alert alert-success d-block fadeIn mb-10" role="alert">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <h3 class="font-weight-normal">Detail Perawatan Aset</h3>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Jenis Aset: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.jenis+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Unit Kerja: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.unit_kerja+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Judul Kegiatan: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.judul_kegiatan+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Tanggal Perawatan: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.tglkegiatan+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3 mt-3">
                                <span class="fs-6 text-gray-400">Keterangan: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.keterangan+ `</span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">File Pdf: </span>
                                <span class="fs-6 fw-bolder text-gray-600">` +data.filepdf+ `</span>
                            </div>
                            <div class="d-flex flex-column flex-root mb-3">
                                <span class="fs-6 text-gray-400">Foto Kegiatan: </span>
                            </div>
                            ` +data.foto_kegiatan+ `
                        </div>
                    </div>
                </div></div>`;
                $('#modalDetailAset').html(divDetailAset);
                $('#detailModal .modal-header .modal-title').html('<i class="bi bi-back fs-3 me-2"></i> '+ data.nama +'');
                blockUi.release(), blockUi.destroy();
                $('#detailModal').modal('show');
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
    })
}

// close all modal
function _closeModal(){
    $('#detailModal').modal('hide');
}

//Close Content Card by Open Method
const _closeCard = (card) => {
    if(card=='form_perawatan') {
        save_method = '';
        _clearForm(), $('#card-form .card-header .card-title').html('');
    }
    $('#card-form').hide(), $('#card-data').show();
}
//Clear Form data
const _clearForm = () => {
    if (save_method == "" || save_method == "add_data") {
        $('#form-data')[0].reset(), $('[name="id"]').val(''), $('[name="methodform_perawatanAset"]').val(''), $("#fid_aset").val('').trigger('change'),$("#tanggal_perawatan").flatpickr({defaultDate: $("#tanggal_perawatan").val(),dateFormat: "d/m/Y"}), $('#keterangan_perawatan').summernote('code', ''),_loadDropifyFile('', '#foto_perawatan'),_loadDropifyFile('', '#file_pdf');
    } else {
        let id = $('[name="id"]').val();
        _editData(id);
    }
}
//Button Reset Form Perawatan Aset
$('#btn-reset').click(function (e){
    e.preventDefault();
    _clearForm();
});
//Add data
const _addData = () => {
    save_method = "add_data";
    _clearForm(),
    load_formaddons(),
    $("#card-form .card-header .card-title").html(
        `<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-window-plus fs-2 text-gray-900 me-2"></i>Form Tambah Perawatan Aset</h3>`
    ),
    $("#card-data").hide(), $("#card-form").show();
}
//Edit data
const _editData = (idp) => {
    save_method = "update_data";
    let target = document.querySelector("#card-form"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block(), blockUi.destroy();
    load_formaddons(), $('#form-data')[0].reset(), $('[name="methodform_perawatanAset"]').val('update'), $("#fid_aset").val('').trigger('change'), $("#tanggal_perawatan").flatpickr({defaultDate: $("#tanggal_perawatan").val(),dateFormat: "d/m/Y"}),  $('#keterangan_perawatan').summernote('code', ''), _loadDropifyFile('', '#foto_perawatan'),_loadDropifyFile('', '#file_pdf');
    
    //Ajax load from ajax
    $.ajax({
        url: BASE_URL+ '/ajax/perawatan_aset_edit',
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: 'GET',
        dataType: 'JSON',
        data: {
            idp,
        },
        success: function (data) {
            blockUi.release(), blockUi.destroy();
            if(data.status==true){
                $('[name="id"]').val(data.id);
                var selected = $("<option selected='selected'></option>").val(data.fid_aset).text(data.nama);
                $("#fid_aset").append(selected).trigger('change'), loadDtl_dataAset(data.fid_aset),
                $('#judul_kegiatan').val(data.judul_kegiatan),$("#tanggal_perawatan").flatpickr({defaultDate: data.tglkegiatan,dateFormat: "d/m/Y"}),_loadDropifyFile(data.urlFoto, '#foto_perawatan'), _loadDropifyFile(data.filepdf, '#file_pdf');
                //Summernote Keterangan
                var keterangan = data.keterangan;
                $('#keterangan_perawatan').summernote('code', keterangan),
                $('#card-form .card-header .card-title').html('<h3 class="card-label"><i class="la la-edit fs-2 text-gray-900 me-2"></i> Form Edit Data Perawatan Aset</h3>');
                $("#card-data").hide(), $("#card-form").show();
            }else{
                swal.fire("Ooops!", "Terjadi kesalahan periksa koneksi internet lalu coba kembali!", "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            blockUi.release(), blockUi.destroy();
            console.log("load data is error!");
            Swal.fire({
                title: "Ooops!",
                text: "Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.",
                icon: "error",
                allowOutsideClick: false,
            });
        },
    });
}
//Save data by Enter
$("#form-data input").keyup(function (event) {
    if (event.keyCode == 13 || event.key === "Enter") {
        $("#btn-save").click();
    }
});
//Save data Form
$("#btn-save").on("click", function (e) {
    e.preventDefault();
    $("#btn-save").html('<span class="spinner-border spinner-border-sm align-middle me-3"></span> Mohon Tunggu...').attr("disabled", true);
    let 
    aset = $('#fid_aset'),
    tanggal_perawatan = $('#tanggal_perawatan'),
    judul_kegiatan = $('#judul_kegiatan'),
    keterangan_perawatan = $('#keterangan_perawatan'),
    foto_perawatan = $('#foto_perawatan'),
    fotoperawatan_preview = $('#fg-fotoPerawatan .dropify-preview .dropify-render').html(),
    file_pdf = $('#file_pdf'),
    filepdf_priview = $('#fg-filePdf .dropify-preview .dropify-render').html();
    
    if (aset.val() == '' || aset.val() == null) {
        toastr.error('Aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        aset.focus().select2('open');
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (tanggal_perawatan.val() == '') {
        toastr.error('Tgl. perawatan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        tanggal_perawatan.focus();
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (judul_kegiatan.val() == '') {
        toastr.error('Judul perawatan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        judul_kegiatan.focus();
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (keterangan_perawatan.summernote('isEmpty')) {
        toastr.error('Keterangan perawatan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        keterangan_perawatan.summernote('focus');
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (fotoperawatan_preview == '') {
        toastr.error('Foto perawatan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-fotoPerawatan .dropify-wrapper').addClass('border-2 border-danger').stop().delay(2500).queue(function () {
            $(this).removeClass('border-2 border-danger');
        });
        foto_perawatan.focus();
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }
    if (filepdf_priview == '') {
        toastr.error('File pdf perawatan aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        $('#fg-filePdf .dropify-wrapper').addClass('border-2 border-danger').stop().delay(2500).queue(function () {
            $(this).removeClass('border-2 border-danger');
        });
        file_pdf.focus();
        $('#btn-save').html('<i class="far fa-save"></i> Simpan').attr('disabled', false);
        return false;
    }

    let textConfirmSave = "Simpan perubahan data sekarang ?";
    if (save_method == "add_data") {
        textConfirmSave = "Tambahkan data sekarang ?";
    }

    Swal.fire({
        title: "",
        text: textConfirmSave,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.value) {
            let target = document.querySelector("#card-form"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
            blockUi.block(), blockUi.destroy();
            let formData = new FormData($("#form-data")[0]), ajax_url = BASE_URL+ "/ajax/perawatan_aset_save";
            if(save_method == 'update_data') {
                ajax_url = BASE_URL+ "/ajax/perawatan_aset_update";
            }
            $.ajax({
                url: ajax_url,
                headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                dataType: "JSON",
                success: function (data) {
                    $("#btn-save").html('<i class="far fa-save"></i> Simpan').attr("disabled", false);
                    blockUi.release(), blockUi.destroy();
                    
                    if (data.status == true) {
                        var message = 'Data perawatan aset berhasil perbarui'
                        if(save_method == 'add_data'){
                            var message = 'Data perawatan aset baru berhasil ditambahkan'
                        }
                        Swal.fire({
                            title: "Success!",
                            text: message,
                            icon: "success",
                            allowOutsideClick: false,
                        }).then(function (result) {
                            _closeCard('form_perawatan'), _loadDataPerawatan();
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
                }, error: function (jqXHR, textStatus, errorThrown) {
                    $("#btn-save").html('<i class="far fa-save"></i> Simpan').attr("disabled", false);
                    blockUi.release(), blockUi.destroy();
                    Swal.fire({
                        title: "Ooops!",
                        text: "Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.",
                        icon: "error",
                        allowOutsideClick: false,
                    });
                }
            });
        } else {
            $("#btn-save").html('<i class="far fa-save"></i> Simpan').attr("disabled", false);
        }
    });
});

