$('.datepicker').datepicker({
	autoclose: true,
	todayHighlight: true,
	enableOnReadonly: false,
	format: "yyyy-mm-dd",
	language: "id"
});

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
	toast.addEventListener('mouseenter', Swal.stopTimer)
	toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

 var _closeForm = function() {
    save_method = ''; 
    _clearForm(), $('#modal').modal('hide'); 
}
var _clearForm = function() {
    if(save_method=='' || save_method=='add_data') {
        $('#form-data')[0].reset(), $('[name="id"]').val(''),$('[name="methodform_data"]').val(''),
        $('[name="dokumenOld"]').val(''),
        $('#dokumenView').html(''),
        $('#tanggal').val(''),
        $('#keterangan').val(''); 
    } else {
        var id_data = $('[name="id"]').val();
        _editData(id_data);
    }
}
var _editData = function(id_data) {
    $.blockUI({ message: 'Sedang memproses...', css: { border: 'none', padding: '12px', backgroundColor: '#fff', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#222' } }); 
	save_method = 'update_data';
    $('#form-data')[0].reset(), $('[name="methodform_data"]').val('update'); 
    $.ajax({
        url: BASE_URL+ "/pengajuan/edit/",
        type: "GET",
        dataType: "JSON",
        data: {
            'id': id_data
        }, success: function (data) { 
			$.unblockUI();
            if (data.status == true) { 
				var dokumen=data.detail.dokumen; 
				if(dokumen) { 
					$('#dokumenView').html('<object data="'+dokumen+'" width="100%;height:200px"><object>') 	
				} else {
					$('#dokumenView').html('')	
				}  
                $('[name="id"]').val(data.detail.id),     
                $('[name="tanggal"]').val(data.detail.tanggal),              
                $('[name="keterangan"]').val(data.detail.keterangan),     
                $('[name="dokumenOld"]').val(data.detail.dokumenOld),        
				$('#modal').modal('show');
            } else {
                alert('Load data mengalami masalah, Periksa koneksi jaringan internet lalu coba kembali')
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
			$.unblockUI();
            alert('Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.')
        }
    });
}  

var _addData = function() {
	$.blockUI({ message: 'Sedang memproses...', css: { border: 'none', padding: '12px', backgroundColor: '#fff', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#222' } }); 
	setTimeout($.unblockUI, 900); 
	
    save_method = 'add_data'; 
    _clearForm(), $('[name="methodform_data"]').val('add'),$('#modal').modal('show');
}     

let oTable;

$(function () {
	oTable = $('#loaddatapengajuan').DataTable({    
		ordering: false,
		responsive: false,
		processing: true,
		serverSide: true, 
		columnDefs: [ 
			{ className: 'text-center', targets: [0,3,4,5] },   
		], 
		"lengthMenu": [[10, 50, 100, -1], [10, 50, 100, "Semua"]], 
		ajax: BASE_URL+"/ajax/pengajuan",  
		columns: [
			{ data: 'DT_RowIndex', orderable: false, searchable: false },               
			{ data: 'tanggal_indo', name: 'group_pengajuan.tanggal' }, 
			{ data: 'keterangan', name: 'keterangan' }, 
			{ data: 'dokumen', name: 'dokumen', orderable: false, searchable: false },     
			{ data: 'status', name: 'status', orderable: false, searchable: false },     
			{ data: 'action', name: 'action', orderable: false, searchable: false },  
		],
		drawCallback: function( settings ) { 
			$('[data-toggle="tooltip"]').tooltip();   
            
            $('.js-switch').each(function() {
                new Switchery($(this)[0], $(this).data()); 
            });

            $('.js-switch').on('change',function(e){
                statusData($(this).data("id"),$(this).data("status")) 
            });
		} 
	}) 
}); 
 
function showPdf(urlDokumen) {  
	Swal.fire({
	  title: 'Dokumen', 
	  confirmButtonText: 'Tutup',
	  html:urlDokumen ? '<object data="'+urlDokumen+'" width="100%" height="400"></object>' : 'tidak ada data untuk bagian ini'
	})
} 

function statusData(id,status) {
    url=BASE_URL+"/pengajuan/status/"+id+"/"+status;
    $.post(url, {
        '_token': $('[name=csrf-token]').attr('content'),
        '_method': 'delete'
    }).done((response) => {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Berhasil mengubah status.',
          showConfirmButton: false,
          timer: 1500
        })       
        oTable.draw();
    }).fail((errors) => { 
        Swal.fire({
          position: 'top-center',
          icon: 'danger',
          title: 'Tidak dapat mengubah status.',
          showConfirmButton: false,
          timer: 1500
        })   
        return;
    });
}
 
function deleteData(url) {
	Swal.fire({ 
		position: 'top-center', 
		title: 'Yakin ingin ubah status?',  
		showCancelButton: true,
		allowOutsideClick: false,
		confirmButtonText: "Ya",
		cancelButtonText: "Batal"
	}).then((result) => { 
	  if (result.isConfirmed) {
		$.post(url, {
			'_token': $('[name=csrf-token]').attr('content'),
			'_method': 'delete'
		}).done((response) => {
			Swal.fire({
			  position: 'top-center',
			  icon: 'success',
			  title: 'Data berhasil ubah status.',
			  showConfirmButton: false,
			  timer: 1500
			})       
			oTable.draw();
		}).fail((errors) => { 
			Swal.fire({
			  position: 'top-center',
			  icon: 'danger',
			  title: 'Tidak dapat ubah status.',
			  showConfirmButton: false,
			  timer: 1500
			})   
			return;
		});
	  } else if (result.isDenied) { 
		Swal.fire({
		  position: 'top-center',
		  icon: 'info',
		  title: 'Batal ubah status data.',
		  showConfirmButton: false,
		  timer: 1500
		})    
		oTable.draw();
	  }
	}) 
} 

$('#btn-save').on('click', function (e) {
    e.preventDefault();
    $('#btn-save').html('<i class="fa fa-spin fa-spinner"></i> Mohon Tunggu...').attr('disabled', true);
    const tanggal = $('#tanggal'),keterangan = $('#keterangan'); 
	if (tanggal.val() == '') { 
		Toast.fire({ 
		  title: 'Tanggal tidak boleh kosong...'
		})  
        tanggal.focus();
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    } 
	if (keterangan.val() == '') { 
		Toast.fire({ 
		  title: 'Keterangan tidak boleh kosong...'
		})  
        keterangan.focus();
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }     
	
    Swal.fire({
        title: 'Halo!',  
        text: 'Apakah Anda yakin ingin menyimpan data ini ?',  
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then(result => {
        if (result.value) {
            $.blockUI({ message: 'Sedang memproses...', css: { border: 'none', padding: '12px', backgroundColor: '#fff', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#222' } }); 
            var formData = new FormData($('#form-data')[0]), ajax_url= BASE_URL+ "/ajax_save_pengajuan";
            $.ajax({
                url: ajax_url,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                dataType: "JSON", 
                success: function (data) {
					$.unblockUI();
                    $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
                    
                    if (data.status==true){ 
						Swal.fire({
							icon: 'success', 
							text: 'Data berhasil disimpan. Terima kasih!',  
							confirmButtonText: 'Selesai!', 
						}).then((result) => {  
							_closeForm(), oTable.draw();
						});  
                    }else{  
						if(data.pesan_code=='format_inputan') { 
							Swal.fire({ 
								title: 'Maaf!',
								text: data.pesan_error[0],
								allowOutsideClick: false, 
							}) 
						} else { 
							Swal.fire({ 
								title: 'Maaf!',
								text: 'Pastikan Anda melengkapi form dengan benar. Terima kasih!',
								allowOutsideClick: false, 
							})  
						} 
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
					$.unblockUI();
					$('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false); 
					Swal.fire({ 
						title: 'Maaf!',
						text: 'Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.',
						allowOutsideClick: false, 
					})   
                }
            });
        } else {
            $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        }
    });
});

$("#form-data input").keyup(function(event) {
    if (event.keyCode == 13 || event.key === 'Enter') {
        $("#btn-save").click();
    }
}); 
 