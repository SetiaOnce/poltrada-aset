//Class Definition
var save_method;
var table;
//Load Datatables banner
const _loadJenisAset = () => {
    table = $('#dt-jenisAset').DataTable({
        searchDelay: 300,
        processing: true,
        serverSide: true,
        ajax: {
            url: BASE_URL+ '/master/ajax/load_jenis_aset',
            headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
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
            { data: 'DT_RowIndex', name: 'DT_RowIndex', width: "5%", className: "align-top text-center border px-2", searchable: false },
            { data: 'kode_jenis_aset', name: 'kode_jenis_aset', width: "30%", className: "align-top border px-2" },
            { data: 'jenis_aset', name: 'jenis_aset', width: "45%", className: "align-top border px-2" },
            { data: 'icon', name: 'icon', width: "10%", className: "text-center align-top border px-2" },
            { data: 'action', name: 'action', width: "10%", className: "align-top text-center border px-2", orderable: false, searchable: false },
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
        // "dom": "<'row'<'col-sm-6 d-flex align-items-center justify-conten-start'l><'col-sm-6 d-flex align-items-center justify-content-end'f>><'table-responsive'tr><'row'<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i><'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>>",
        fnDrawCallback: function (settings, display) {
            $('[data-bs-toggle="tooltip"]').tooltip("dispose"), $(".tooltip").hide();
            //Search Table
            $("#search-dtTable").on("keyup", function () {
                table.search(this.value).draw();
                if ($(this).val().length > 0) {
                    $("#clear-searchDtTable").show();
                } else {
                    $("#clear-searchDtTable").hide();
                }
            });
            //Clear Search Table
            $("#clear-searchDtTable").on("click", function () {
                $("#search-dtTable").val(""),
                table.search("").draw(),
                $("#clear-searchDtTable").hide();
            });
            //Custom Table
            $("#dt-slides_length select").selectpicker(),
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
    $("#dt-jenisAset").css("width", "100%"),
    $("#search-dtTable").val(""),
    $("#clear-searchDtTable").hide();
}

// input data no space
$(".no-space").on({
    keydown: function(e) {
        if (e.which === 32)
        return false;
    },
    change: function() {
        this.value = this.value.replace(/\s/g, "");
    }
});

// text editor
// $('#deskripsi').summernote({
//     placeholder: 'Isi Deskripsi ...',
//     toolbar: [
//         ['style', ['bold', 'italic', 'underline']],['para', ['ul', 'ol']],
//     ],
//     height: 100, minHeight: null, maxHeight: null, dialogsInBody: false, focus: false, popatmouse: false, lang: 'id-ID'
// });

//Cek Icon Jenis Aset
$("#icon").on("change",function(){
    var textIcon = $(this).val();
    if(textIcon==''){
        $('#sample_icon').html('...');
    }else{
        $('#sample_icon').html('<i class="bi bi-' +textIcon+ ' fs-1"></i>');
    }
});


//Close Content Card by Open Method
const _closeCard = (card) => {
    if(card=='form_slide') {
        save_method = '';
        _clearForm(), $('#card-form .card-header .card-title').html('');
    }
    $('#card-form').hide(), $('#card-data').show();
}
//Clear Form data
const _clearForm = () => {
    if (save_method == "" || save_method == "add_data") {
        $("#form-data")[0].reset();
        // $('#deskripsi').summernote('code', '');
        $('[name="id"]').val("");
    } else {
        let id = $('[name="id"]').val();
        _editData(id);
    }
}
//Add data
const _addData = () => {
    save_method = "add_data";
    $('#sample_icon').html('...')
    _clearForm(),
    $("#card-form .card-header .card-title").html(
        `<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-window-plus fs-2 text-gray-900 me-2"></i>Form Tambah Jenis Aset</h3>`
    ),
    $("#card-data").hide(), $("#card-form").show();
}
//Edit data
const _editData = (idp) => {
    save_method = "update_data";
    let target = document.querySelector("#card-form"), blockUi = new KTBlockUI(target, { message: messageBlockUi });
    blockUi.block(), blockUi.destroy();
    //Ajax load from ajax
    $.ajax({
        url: BASE_URL+ '/master/ajax/jenis_aset_edit',
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
        type: 'GET',
        dataType: 'JSON',
        data: {
            idp,
        },
        success: function (data) {
            blockUi.release(), blockUi.destroy();
            if (data.status == true) {
                $('[name="id"]').val(data.row.id),

                $('[name="kode_jenis_aset"]').val(data.row.kode_jenis_aset),
                $('[name="jenis_aset"]').val(data.row.jenis_aset);
                $('[name="deskripsi"]').val(data.row.deskripsi);
                $('[name="icon"]').val(data.row.icon);

                $('#sample_icon').html('<i class="bi bi-' +data.row.icon+ ' fs-1"></i>');
                $("#card-form .card-header .card-title").html(
                    `<h3 class="fw-bolder fs-2 text-gray-900"><i class="bi bi-pencil-square fs-2 text-gray-900 me-2"></i>Form Edit Jenis Aset</h3>`
                ),
                $("#card-data").hide(), $("#card-form").show();
            } else {
                Swal.fire({title: "Ooops!", text: data.message, icon: "warning", allowOutsideClick: false});
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
    kode_jenis_aset = $('#kode_jenis_aset'), 
    jenis_aset = $('#jenis_aset'),
    deskripsi = $('#deskripsi'),
    icon = $('#icon');
    
    if (kode_jenis_aset.val() == '') {
        toastr.error('Kode jenis aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        kode_jenis_aset.focus();
        $('#btn-save').html('<i class="las la-save fs-1 me-3"></i>Simpan').attr('disabled', false);
        return false;
    }
    if (jenis_aset.val() == '') {
        toastr.error('Jenis aset masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        jenis_aset.focus();
        $('#btn-save').html('<i class="las la-save fs-1 me-3"></i>Simpan').attr('disabled', false);
        return false;
    }if (deskripsi.val() == '') {
        toastr.error('Deskripsi masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        deskripsi.focus();
        $('#btn-save').html('<i class="las la-save fs-1 me-3"></i>Simpan').attr('disabled', false);
        return false;
    }
    if (icon.val() == '') {
        toastr.error('Icon masih kosong...', 'Uuppss!', {"progressBar": true, "timeOut": 1500});
        icon.focus();
        $('#btn-save').html('<i class="las la-save fs-1 me-3"></i>Simpan').attr('disabled', false);
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
            let formData = new FormData($("#form-data")[0]), ajax_url = BASE_URL+ "/master/ajax/jenis_aset_save";
            if(save_method == 'update_data') {
                ajax_url = BASE_URL+ "/master/ajax/jenis_aset_update";
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
                    $("#btn-save").html('<i class="las la-save fs-1 me-3"></i>Simpan').attr("disabled", false);
                    blockUi.release(), blockUi.destroy();
                    
                    if (data.status == true) {
                        var message = 'Data jenis aset berhasil perbarui'
                        if(save_method == 'add_data'){
                            var message = 'Data jenis aset baru berhasil ditambahkan'
                        }
                        Swal.fire({
                            title: "Success!",
                            text: message,
                            icon: "success",
                            allowOutsideClick: false,
                        }).then(function (result) {
                            _closeCard('form_slide'), _loadJenisAset();
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
                    $("#btn-save").html('<i class="las la-save fs-1 me-3"></i>Simpan').attr("disabled", false);
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
            $("#btn-save").html('<i class="las la-save fs-1 me-3"></i>Simpan').attr("disabled", false);
        }
    });
});

//Class Initialization
jQuery(document).ready(function() {
    _loadJenisAset();
});