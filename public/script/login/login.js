$(document).ready(function () {
    _loadInfoSite();
    $("#formAct").submit(function () {
        $(".submitBtn").attr("disabled", true);
        return true;
    });
});

$(window).on('load', function() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
})
const _loadInfoSite = () => {
    $.ajax({
        url: BASE_URL+ "/front/load_login_info",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#dt-banner').html(data.banner_login);
            $('#footer-login').html(data.desc_footer);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log('Load data is error');
        }
    });
}

// show password
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
// refresh captcha
$('#refreshcaptcha').click(function() { 
    var token = '{!! csrf_token() !!}';
    var request = 1;
    var url = BASE_URL + '/reloadcaptcha';
    $.get(url, {_token:token, request:request}, function(e) {
        $('#captcha').val('');
        $('#captchaShow').fadeIn('slow').html(e);
    });
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
                    window.location.href = BASE_URL+"/app_admin/dashboard"; 
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
            console.log('error login');
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
  
