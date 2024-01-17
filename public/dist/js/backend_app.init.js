"use strict";
// Class Definition
//Message BlockUi
const messageBlockUi = '<div class="blockui-message bg-light text-dark"><span class="spinner-border text-primary"></span> Please wait ...</div>';
//Validate Email
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//System INFO
const _loadSystemInfo = () => {
	$.ajax({
        url: base_url+ "app_admin/load_app_profile_site",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            let headerLogo = `
                <img alt="Logo" src="` +data.backend_logo+ `" class="h-40px app-sidebar-logo-default" />
                <img alt="Logo" src="` +data.backend_logo_icon+ `" class="h-40px app-sidebar-logo-minimize" />
            `;
            $('#kt_app_sidebar_logo a').html(headerLogo);
            let headerLogoMobile = `<img alt="Logo-mobile" src="` +data.backend_logo_icon+ `" class="h-30px" />`;
            $('#logoMobile a').html(headerLogoMobile);
            $('#footerCopyright').html(data.copyright);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
};

//User INFO
const _loadUserInfo = () => {
	$.ajax({
        url: base_url+ "app_admin/load_profile",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            let userThumbHeader = `<img src="` +data.foto+ `" alt="avatar-user" />`;
            $('#kt_header_user_menu_toggle .avatar-header').html(userThumbHeader);
            
            $('#nameUserHeader').html(`<div class="fw-bold d-flex align-items-center fs-5">
                ` +data.nama+ `
            </div>
            <a href="javascript:void(0);" class="fw-semibold text-muted text-hover-primary fs-7"> ` +data.level+ ` </a>`);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log('Load data is error');
        }
    });
};

//Upload Image to Local Server with Summernote JS
var _uploadFile_editor = function(image, idCustom) {
	var data = new FormData();
	data.append("image", image);
	$.ajax({
		url: base_url+ "app_admin/ajax_upload_imgeditor",
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
		data: data,
		type: "POST",
		cache: false,
        contentType: false,
        processData: false,
        dataType: "JSON",
		success: function(data){
			if(data.status){
				if(idCustom){
					$(idCustom).summernote("insertImage", data.url_img);
				}else{
					$('.summernote').summernote("insertImage", data.url_img);
				}
			}else{
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
		}, error: function (jqXHR, textStatus, errorThrown, data) {
			console.log('Error upload images to text editor');
			toastr.error(errorThrown+ ', <br />' +jqXHR.responseJSON.errors.image[0], 'Uuppss!', {"progressBar": true, "timeOut": 1500});
		}
	});
};
// Class Initialization
jQuery(document).ready(function() {
	_loadSystemInfo(), _loadUserInfo();
});