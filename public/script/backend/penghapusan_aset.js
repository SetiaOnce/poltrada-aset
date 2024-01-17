//Class Definition
var save_method;var table;
//Class Initialization
jQuery(document).ready(function() {
    _loadDataAset(), loadSelectpicker_jenis(), load_formaddons();
    $('.numberOnlyMax12').mask('000000000000')
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
   OnClick Search data
*************************/
$('#btnSearchData').click(function () {
    reload_dtAset();
});
// RESET FILTER DATA TABLE
$('#btnResetFilter').on('click', function (e) {
    e.preventDefault();
    $('#filterDt-nupawal').val('');
    $('#filterDt-nupakhir').val('');
    $('#filterDt-jenisAset').selectpicker('val', '');
    reload_dtAset();
});
//Load Datatables Aset
const _loadDataAset = () => {
    table = $('#dt-aset').DataTable({
        // "searchDelay": 500,
        "processing": true,
        "serverSide": true,
        "order" : [],
        // Load data for the table's content from an Ajax source
        "ajax" : {
            "url" : BASE_URL+ "/ajax/load_list_penghapusan_aset",
            'headers': { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            "type" : "POST",
            "data": function ( data ) {
                data.idp_jenis= $('#filterDt-jenisAset').val();
                data.nup_awal= $('#filterDt-nupawal').val();
                data.nup_akhir= $('#filterDt-nupakhir').val();
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
//Refresh Datatables peneriksaan Aset
function reload_dtAset(){
	$('#dt-aset').DataTable().ajax.reload(), $('#dt-aset').css('width', '100%').DataTable().columns.adjust().draw();
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
    $("#tanggal_pemeriksaan").flatpickr({
        defaultDate: $("#tanggal_pemeriksaan").val(),
        dateFormat: "d/m/Y"
    });
    //Spesifikasi Input
    $('#keterangan_pemeriksaan').summernote({
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
const _deleteAset = (idp_aset) => {
    Swal.fire({
        title: "Hallo...",
        text: "Apakah kamu yakin ingin menghapus data ini?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.value) {
            let target = document.querySelector("#card-data"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
            blockUi.block(), blockUi.destroy();
            let ajax_url = BASE_URL+ "/ajax/delete_data_aset";
            $.ajax({
                url: ajax_url,
                headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                type: "POST",
                data: {
                    idp_aset
                },
                dataType: "JSON",
                success: function (data) {
                    blockUi.release(), blockUi.destroy();
                    if (data.status == true) {
                        Swal.fire({title: "Success!",text: "Data aset berhaisl dihapus...",icon: "success",allowOutsideClick: false,
                        }).then(function (result) {
                            _loadDataAset();
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
        }
    });
}
