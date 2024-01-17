/**
 * Login
 */
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

 "use strict";
$('#btn-save').on('click', function (e) {
    e.preventDefault();
    $('#btn-save').html('<i class="fa fa-spin fa-spinner"></i> Mohon Tunggu...').attr('disabled', true);
    const email = $('#email'),password = $('#password'),captcha = $('#captcha');
	if (email.val() == '') {
		Toast.fire({ 
		  title: 'Email tidak boleh kosong...'
		}) 
        email.focus();
        $('#btn-save').html('MASUK KE APLIKASI').attr('disabled', false);
        return false;
    }
	if (password.val() == '') {
		Toast.fire({ 
		  title: 'Password tidak boleh kosong...'
		})  
        password.focus();
        $('#btn-save').html('MASUK KE APLIKASI').attr('disabled', false);
        return false;
    }
	if (captcha.val() == '') {
		Toast.fire({ 
		  title: 'Captcha tidak boleh kosong...'
		})   
        captcha.focus();
        $('#btn-save').html('MASUK KE APLIKASI').attr('disabled', false);
        return false;
    }

	$.blockUI({ message: '<div class="spinner-border text-primary" role="status"> <span class="sr-only">Loading...</span> </div>', css: { border: 'none', padding: '12px', backgroundColor: '#fff', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#222' } });
	var formData = new FormData($('#form-data')[0]), ajax_url= BASE_URL+ "/ajax_login";
	$.ajax({
		url: ajax_url,
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		dataType: "JSON",
		success: function (data) {
			$.unblockUI();
			$('#btn-save').html('MASUK KE APLIKASI').attr('disabled', false);

			if (data.status==true){
				Swal.fire({
					title: "Lanjutkan!",
					text: "Anda berhasil Login. Sistem akan mengarahkan Anda ke halaman Dashboard Anda. Terima kasih!", 
					icon: "success",
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					allowOutsideClick: false
				}).then(function (result) {
					window.location.href = BASE_URL+"/home"; 
				}); 
			}else{
				if(data.pesan_code=='format_inputan') {
					Toast.fire({ 
					  title: data.pesan_error[0]
					})    
				} else {
					Toast.fire({ 
					title: data.pesan_error
					})      
				}
			}
		}, error: function (jqXHR, textStatus, errorThrown) {
			$.unblockUI();
			$('#btn-save').html('MASUK KE APLIKASI').attr('disabled', false);
			Toast.fire({ 
			  title: 'Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.'
			})   
		}
	}); 
});

$("#form-data input").keyup(function(event) {
    if (event.keyCode == 13 || event.key === 'Enter') {
        $("#btn-save").click();
    }
});
