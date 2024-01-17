 
$('.datepicker').datepicker({
	autoclose: true,
	todayHighlight: true,
	enableOnReadonly: false,
	format: "yyyy-mm-dd",
	language: "id"
});

$('#negara_id').on('change', function (e) { 
	$("#provinsi_id").val(null).trigger('change'),
    _loadProv(e.target.value) 
});
const _loadProv = (negara_id) => {
    $('#provinsi_id').select2({
        width: '100%',
        allowClear: true,
        ajax: {
            url: BASE_URL+"/ajax_provinsi_select2",
            dataType: 'json',
            delay: 250,
            data: function(params, page) {
                return {
                    term: params.term,
                    negara_id: negara_id,
                    page: page
                }
            },
            processResults: function (data) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.provinsi
                        }
                    })
                };
            },
            cache: true
        },
        language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
        placeholder: '-- Pilih Provinsi --',
    });
} 

$('#provinsi_id').on('change', function (e) { 
	$("#kabupaten_id").val(null).trigger('change'),
    _loadKabKota(e.target.value) 
});
const _loadKabKota = (provinsi_id) => {
    $('#kabupaten_id').select2({
        width: '100%',
        allowClear: true,
        ajax: {
            url: BASE_URL+"/ajax_kabupaten_select2",
            dataType: 'json',
            delay: 250,
            data: function(params, page) {
                return {
                    term: params.term,
                    provinsi_id: provinsi_id,
                    page: page
                }
            },
            processResults: function (data) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.kabupaten
                        }
                    })
                };
            },
            cache: true
        },
        language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
        placeholder: '-- Pilih KabKota --',
    });
} 

$('#kabupaten_id').on('change', function (e) { 
	$("#kecamatan_id").val(null).trigger('change'),
    _loadKecamatan(e.target.value) 
});
const _loadKecamatan = (kabupaten_id) => {
    $('#kecamatan_id').select2({
        width: '100%',
        allowClear: true,
        ajax: {
            url: BASE_URL+"/ajax_kecamatan_select2",
            dataType: 'json',
            delay: 250,
            data: function(params, page) {
                return {
                    term: params.term,
                    kabupaten_id: kabupaten_id,
                    page: page
                }
            },
            processResults: function (data) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.kecamatan
                        }
                    })
                };
            },
            cache: true
        },
        language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
        placeholder: '-- Pilih Kecamatan --',
    });
} 

$('#kecamatan_id').on('change', function (e) { 
	$("#kelurahan_id").val(null).trigger('change'),
    _loadKelurahan(e.target.value) 
});
const _loadKelurahan = (kecamatan_id) => {
    $('#kelurahan_id').select2({
        width: '100%',
        allowClear: true,
        ajax: {
            url: BASE_URL+"/ajax_kelurahan_select2",
            dataType: 'json',
            delay: 250,
            data: function(params, page) {
                return {
                    term: params.term,
                    kecamatan_id: kecamatan_id,
                    page: page
                }
            },
            processResults: function (data) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.kelurahan
                        }
                    })
                };
            },
            cache: true
        },
        language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
        placeholder: '-- Pilih Keluarahan --',
    });
} 

$('#shift').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_shift_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
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
	placeholder: '-- Pilih Shift --',
});
$('#kantor_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_get_kantor_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.kantor
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Kantor / Instansi --',
});
$('#jabatan_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_get_jabatan_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.jabatan
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Jabatan --',
});
$('#negara_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_get_negara_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.negara
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Negara --',
});
$('#status').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_status_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
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
	placeholder: '-- Pilih Status --',
});
$('#unit_kerja_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_unit_kerja_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.unit_kerja
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Unit Kerja --',
});
$('#status_kepegawaian_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_status_kepegawaian_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.status_kepegawaian
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Status Kepegawaian --',
});
$('#golongan_darah').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_golongan_darah_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
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
	placeholder: '-- Pilih Golongan Darah --',
});
$('#status_nikah_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_status_nikah_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.status_nikah
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Status Nikah --',
});
$('#agama_id').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_agama_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
			return {
				results:  $.map(data, function (item) {
					return {
						id: item.id,
						text: item.agama
					}
				})
			};
		},
		cache: true
	},
	language: { inputTooShort: function () { return 'Masukkan minimal 1 karakter.'; } },
	placeholder: '-- Pilih Agama --',
});
$('#jenis_kelamin').select2({
	width: '100%',
	allowClear: true,
	ajax: {
		url: BASE_URL+"/ajax_jenis_kelamin_select2",
		dataType: 'json', 
		data: function(params, page) {
			return {
				term: params.term,
				page: page
			}
		},
		processResults: function (data) {
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
	placeholder: '-- Pilih Jenis Kelamin --',
});
  
function loadprofil(){ 
    $.ajax({
        url: BASE_URL+ "/ajax_get_profil/",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data.status == true) { 
                var $newOption1 = $("<option selected='selected'></option>").val(data.detail.negara_id).text(data.detail.negara);
				$("#negara_id").append($newOption1).trigger('change'); 
				  
				var $newOption2 = $("<option selected='selected'></option>").val(data.detail.provinsi_id).text(data.detail.provinsi);
				$("#provinsi_id").append($newOption2).trigger('change'); 
				  
				var $newOption3 = $("<option selected='selected'></option>").val(data.detail.kabupaten_id).text(data.detail.kabupaten);
				$("#kabupaten_id").append($newOption3).trigger('change'); 
				  
				var $newOption4 = $("<option selected='selected'></option>").val(data.detail.kecamatan_id).text(data.detail.kecamatan);
				$("#kecamatan_id").append($newOption4).trigger('change'); 
				  
				var $newOption5 = $("<option selected='selected'></option>").val(data.detail.kelurahan_id).text(data.detail.kelurahan);
				$("#kelurahan_id").append($newOption5).trigger('change'); 

				var status='';
				if(data.detail.status==0) {
					status='TIDAK AKTIF';
				}else if(data.detail.status==1) {
					status='AKTIF';
				}
				var $newOption6 = $("<option selected='selected'></option>").val(data.detail.status).text(status);
				$("#status").append($newOption6).trigger('change'); 
				  
				var $newOption7 = $("<option selected='selected'></option>").val(data.detail.unit_kerja_id).text(data.detail.unit_kerja);
				$("#unit_kerja_id").append($newOption7).trigger('change'); 
				   
				var $newOption8 = $("<option selected='selected'></option>").val(data.detail.jenis_kelamin).text(data.detail.jenis_kelamin);
				$("#jenis_kelamin").append($newOption8).trigger('change'); 
				   
				var $newOption9 = $("<option selected='selected'></option>").val(data.detail.agama_id).text(data.detail.agama);
				$("#agama_id").append($newOption9).trigger('change'); 
				    
				var $newOption10 = $("<option selected='selected'></option>").val(data.detail.status_nikah_id).text(data.detail.status_nikah);
				$("#status_nikah_id").append($newOption10).trigger('change'); 
				    
				var $newOption11 = $("<option selected='selected'></option>").val(data.detail.golongan_darah).text(data.detail.golongan_darah);
				$("#golongan_darah").append($newOption11).trigger('change'); 
				    
				var $newOption12 = $("<option selected='selected'></option>").val(data.detail.status_kepegawaian_id).text(data.detail.status_kepegawaian);
				$("#status_kepegawaian_id").append($newOption12).trigger('change'); 
			  
				var $newOption14 = $("<option selected='selected'></option>").val(data.detail.jabatan_id).text(data.detail.jabatan);
				$("#jabatan_id").append($newOption14).trigger('change'); 
			 
				var $newOption15 = $("<option selected='selected'></option>").val(data.detail.kantor_id).text(data.detail.kantor);
				$("#kantor_id").append($newOption15).trigger('change'); 
			 
				var shift='';
				if(data.detail.shift==1) {
					shift='Shift 1';
				}else if(data.detail.shift==2) {
					shift='Shift 2';
				}
				var $newOption13 = $("<option selected='selected'></option>").val(data.detail.shift).text(shift);
				$("#shift").append($newOption13).trigger('change'); 
			 
                $('[name="id"]').val(data.detail.id),               
                $('[name="nik"]').val(data.detail.nik),        
                $('[name="id_bkn"]').val(data.detail.id_bkn),  
                $('[name="golongan_darah"]').val(data.detail.golongan_darah),               
                $('[name="npwp"]').val(data.detail.npwp),               
                $('[name="nip"]').val(data.detail.nip),               
                $('[name="telp"]').val(data.detail.telp),               
                $('[name="nama"]').val(data.detail.nama),               
                $('[name="nama_ibu"]').val(data.detail.nama_ibu),               
                $('[name="tempat_lahir"]').val(data.detail.tempat_lahir),               
                $('[name="tgl_lahir"]').val(data.detail.tgl_lahir),               
                $('[name="nomor_induk"]').val(data.detail.nomor_induk),             
                $('[name="sk_cpns"]').val(data.detail.sk_cpns),               
                $('[name="tgl_cpns"]').val(data.detail.tgl_cpns),               
                $('[name="sk_pengangkatan"]').val(data.detail.sk_pengangkatan),               
                $('[name="tgl_pengangkatan"]').val(data.detail.tgl_pengangkatan),               
                $('[name="lembaga_pengangkatan"]').val(data.detail.lembaga_pengangkatan),               
                $('[name="karpeg"]').val(data.detail.karpeg),               
                $('[name="no_kk"]').val(data.detail.no_kk),               
                $('[name="no_bpjs"]').val(data.detail.no_bpjs),               
                $('[name="email"]').val(data.detail.email),               
                $('[name="alamat"]').val(data.detail.alamat),               
                $('[name="rt"]').val(data.detail.rt),               
                $('[name="rw"]').val(data.detail.rw),               
                $('[name="kode_pos"]').val(data.detail.kode_pos),               
                $('[name="foto_old"]').val(data.detail.foto_old); 
            } else {
                $('[name="id"]').val('');
				$('[name="nik"]').val(''),
				$('[name="id_bkn"]').val(''), 
				$('[name="npwp"]').val(''),
				$('[name="nip"]').val(''),
				$('[name="telp"]').val(''),
				$('[name="nama"]').val(''),
				$('[name="nama_ibu"]').val(''),
				$('[name="tempat_lahir"]').val(''),
				$('[name="tgl_lahir"]').val(''),
				$("#jenis_kelamin").val(null).trigger('change'),
				$("#kantor_id").val(null).trigger('change'),
				$("#jabatan_id").val(null).trigger('change'),
				$("#agama_id").val(null).trigger('change'),
				$("#status_nikah_id").val(null).trigger('change'),
				$("#golongan_darah").val(null).trigger('change'),
				$("#status_kepegawaian_id").val(null).trigger('change'),
				$('[name="nomor_induk"]').val(''),
				$('[name="sk_cpns"]').val(''),
				$('[name="tgl_cpns"]').val(''),
				$('[name="sk_pengangkatan"]').val(''),
				$('[name="tgl_pengangkatan"]').val(''),
				$('[name="lembaga_pengangkatan"]').val(''),
				$('[name="karpeg"]').val(''),
				$('[name="no_kk"]').val(''),
				$('[name="no_bpjs"]').val(''),
				$('[name="email"]').val(''),
				$("#unit_kerja_id").val(null).trigger('change'),
				$("#status").val(null).trigger('change'),
				$("#negara_id").val(null).trigger('change'),
				$("#provinsi_id").val(null).trigger('change'),
				$("#kabupaten_id").val(null).trigger('change'),
				$("#kecamatan_id").val(null).trigger('change'),
				$("#kelurahan_id").val(null).trigger('change'),
				$("#shift").val(null).trigger('change'),
				$('[name="alamat"]').val(''),
				$('[name="rt"]').val(''),
				$('[name="rw"]').val(''),
				$('[name="kode_pos"]').val('');
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
                $('[name="id"]').val('');
				$('[name="nik"]').val(''),
				$('[name="id_bkn"]').val(''), 
				$('[name="npwp"]').val(''),
				$('[name="nip"]').val(''),
				$('[name="telp"]').val(''),
				$('[name="nama"]').val(''),
				$('[name="nama_ibu"]').val(''),
				$('[name="tempat_lahir"]').val(''),
				$('[name="tgl_lahir"]').val(''),
				$("#jenis_kelamin").val(null).trigger('change'),
				$("#kantor_id").val(null).trigger('change'),
				$("#jabatan_id").val(null).trigger('change'),
				$("#agama_id").val(null).trigger('change'),
				$("#status_nikah_id").val(null).trigger('change'),
				$("#golongan_darah").val(null).trigger('change'),
				$("#status_kepegawaian_id").val(null).trigger('change'),
				$('[name="nomor_induk"]').val(''),
				$('[name="sk_cpns"]').val(''),
				$('[name="tgl_cpns"]').val(''),
				$('[name="sk_pengangkatan"]').val(''),
				$('[name="tgl_pengangkatan"]').val(''),
				$('[name="lembaga_pengangkatan"]').val(''),
				$('[name="karpeg"]').val(''),
				$('[name="no_kk"]').val(''),
				$('[name="no_bpjs"]').val(''),
				$('[name="email"]').val(''),
				$("#unit_kerja_id").val(null).trigger('change'),
				$("#status").val(null).trigger('change'),
				$("#negara_id").val(null).trigger('change'),
				$("#provinsi_id").val(null).trigger('change'),
				$("#kabupaten_id").val(null).trigger('change'),
				$("#kecamatan_id").val(null).trigger('change'),
				$("#kelurahan_id").val(null).trigger('change'),
				$("#shift").val(null).trigger('change'),
				$('[name="alamat"]').val(''),
				$('[name="rt"]').val(''),
				$('[name="rw"]').val(''),
				$('[name="kode_pos"]').val('');
            Swal.fire('Terjadi kesalahan yang tidak diketahui, Periksa koneksi jaringan internet lalu coba kembali. Mohon hubungi pengembang jika masih mengalami masalah yang sama.')
        }
    }); 
}

$(function () {
	'use strict';
	  loadprofil();
  });
  
  

$('#btn-save').on('click', function (e) {
    e.preventDefault();
    $('#btn-save').html('<i class="fa fa-spin fa-spinner"></i> Mohon Tunggu...').attr('disabled', true);
    const negara_id = $('#negara_id'),provinsi_id = $('#provinsi_id'),kabupaten_id = $('#kabupaten_id'),kecamatan_id = $('#kecamatan_id'),kelurahan_id = $('#kelurahan_id'),nip = $('#nip'); 
    if (negara_id.val() == '' || negara_id.val() == null) { 
		Swal.fire({ 
			title: 'Maaf!',
			text: 'Negara tidak boleh kosong...',
			allowOutsideClick: false, 
		})  
        negara_id.focus().select2('open'); 
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }    
    if (provinsi_id.val() == '' || provinsi_id.val() == null) { 
		Swal.fire({ 
			title: 'Maaf!',
			text: 'Provinsi tidak boleh kosong...',
			allowOutsideClick: false, 
		})  
        provinsi_id.focus().select2('open'); 
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }    
    if (kabupaten_id.val() == '' || kabupaten_id.val() == null) { 
		Swal.fire({ 
			title: 'Maaf!',
			text: 'KabKota tidak boleh kosong...',
			allowOutsideClick: false, 
		})  
        kabupaten_id.focus().select2('open'); 
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }    
    if (kecamatan_id.val() == '' || kecamatan_id.val() == null) { 
		Swal.fire({ 
			title: 'Maaf!',
			text: 'Kecamatan tidak boleh kosong...',
			allowOutsideClick: false, 
		})  
        kecamatan_id.focus().select2('open'); 
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }     
    if (kelurahan_id.val() == '' || kelurahan_id.val() == null) { 
		Swal.fire({ 
			title: 'Maaf!',
			text: 'Kelurahan tidak boleh kosong...',
			allowOutsideClick: false, 
		})  
        kelurahan_id.focus().select2('open'); 
        $('#btn-save').html('<i class="ti-save"></i> Simpan').attr('disabled', false);
        return false;
    }    
	if (nip.val() == '') {
		Swal.fire({ 
			title: 'Maaf!',
			text: 'NIP tidak boleh kosong...',
			allowOutsideClick: false, 
		})     
        nip.focus();
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
            var formData = new FormData($('#form-data')[0]), ajax_url= BASE_URL+ "/ajax_save_pegawai";
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
							loadprofil();
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
 