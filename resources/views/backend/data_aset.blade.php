@extends('backend.layouts', ['activeMenu' => 'DATA_ASET', 'activeSubMenu' => '', 'title' => 'Data Aset'])
@section('content')
@section('css')
<link href="{{ asset('/dist/plugins/dropify-master/css/dropify.min.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('dist/plugins/bootstrap-file-input/css/fileinput.min.css') }}" rel="stylesheet">
<link href="{{ asset('dist/plugins/bootstrap-file-input/themes/explorer-fas/theme.css') }}" rel="stylesheet">
<link href="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.min.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/Magnific-Popup/magnific-popup.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/summernote/summernote-lite.min.css') }}" rel="stylesheet" type="text/css" /> 
@endsection

<!--begin::Card Form-->
<div class="card" id="col-formAset" style="display: none;">
    <!--begin::Card header-->
    <div class="card-header">
        <div class="card-title"></div>
        <div class="card-toolbar">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn btn-bg-light btn-color-danger me-2" id="btn-closeFormSlide" onclick="_closeFormAset();"><i class="fas fa-times"></i> Tutup</button>
            </div>
        </div>
    </div>
    <!--end::Card header-->

    <!--begin::Form-->
    <div class="card-body">
        <ul class="nav nav-pills mb-3" id="formAset-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="tabs-formAset1" data-bs-toggle="pill" data-bs-target="#formAset1" type="button" role="tab" aria-controls="formAset1" aria-selected="true"> <i class="la la-edit fs-2 text-secondary"></i> Form Data Aset</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link " id="tabs-formAset2" data-bs-toggle="pill" data-bs-target="#formAset2" type="button" role="tab" aria-controls="formAset2" aria-selected="false"><i class="bi bi-cloud-upload-fill fs-2 text-secondary"></i> File Data Aset</button>
            </li>
          </ul>
          <div class="tab-content" id="formAset-tabsContent">
            <div class="tab-pane fade show active" id="formAset1" role="tabpanel" aria-labelledby="tabs-formAset1">
                <form class="form" autocomplete="off" id="form-aset1">
                    <input type="hidden" name="id"><input type="hidden" name="methodform_aset">
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="font-size-lg text-dark font-weight-bold mb-5">Detail Aset</h5>
                            <div class="form-group mb-5" id="fg-fidjenis" style="overflow:hidden;">
                                <label for="fid_jenis">Jenis: <span class="text-danger">*</span></label>
                                <select id="fid_jenis" name="fid_jenis" class="form-control selectpicker show-tick" data-container="#col-formAset" data-live-search="true" title="Pilih jenis aset..."></select>
                                <a href="javascript:void(0);" id="btn-addNewJenisAset" class="text-primary" onclick="addNewJenisAset();">+ Tambahkan jenis aset baru</a>
                            </div>
                            <div class="form-group mb-5">
                                <label for="kode_aset">NUP: <span class="text-danger">*</span></label>
                                <input type="text" id="kode_aset" name="kode_aset" class="form-control nospace" maxlength="20" placeholder="Isi kode aset...">
                                <span class="form-text text-muted">*) Hanya Angka Exp: <code>123456</code></span>
                            </div>
                            <div class="form-group mb-5">
                                <label for="nama_aset">Nama: <span class="text-danger">*</span></label>
                                <input type="text" id="nama_aset" name="nama_aset" class="form-control" maxlength="150" placeholder="Isi nama aset...">
                            </div>
                            <div class="form-group mb-5" id="fg-fidunitkerja" style="overflow:hidden;">
                                <label for="fid_unit_kerja">Bidang: <span class="text-danger">*</span></label>
                                <select id="fid_unit_kerja" name="fid_unit_kerja" class="form-control selectpicker show-tick" data-container="#col-formAset" data-live-search="true" title="Pilih unit kerja..."></select>
                            </div>
                            <div class="form-group mb-5">
                                <label for="no_registrasi">No. Registrasi: <span class="text-danger">*</span></label>
                                <input type="text" id="no_registrasi" name="no_registrasi" class="form-control nospace" maxlength="20" placeholder="Isi no. registrasi aset...">
                            </div>
                            <div class="form-group mb-5">
                                <label for="volume_aset">Volume: </label>
                                <input type="text" id="volume_aset" name="volume_aset" class="form-control" maxlength="50" placeholder="Isi volume aset...">
                                <span class="form-text text-muted">*) Isi dengan: <code>-</code> Jika tidak ada</span>
                            </div>
                            <div class="form-group mb-5">
                                <label for="jumlah_aset">Jumlah: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="bi bi-layers fs-1"></i></span>
                                    </div>
                                    <input type="text" id="jumlah_aset" name="jumlah_aset" class="form-control numberOnlyMax6" maxlength="4" placeholder="Isi jumlah aset...">
                                </div>
                            </div>
                            <div class="form-group mb-5" id="fg-fidsatuan" style="overflow: hidden;">
                                <label for="fid_satuan">Satuan: <span class="text-danger">*</span></label>
                                <select id="fid_satuan" name="fid_satuan" class="form-control selectpicker show-tick" data-container="#col-formAset" data-live-search="true" title="Pilih satuan aset..."></select>
                                <a href="javascript:void(0);" id="btn-addNewSatuanAset" class="text-primary" onclick="addNewSatuanAset();">+ Tambahkan satuan aset baru</a>
                            </div>
                            <div class="form-group mb-5">
                                <label for="tipe_aset">Tipe: <span class="text-danger">*</span></label>
                                <input type="text" id="tipe_aset" name="tipe_aset" class="form-control" maxlength="100" placeholder="Isi tipe aset...">
                            </div>
                            <div class="form-group mb-5">
                                <label for="lokasi_aset">Lokasi: </label>
                                <textarea id="lokasi_aset" name="lokasi_aset" class="form-control" rows="3" maxlength="150" style="min-height:50px;max-height:150px;" placeholder="Isi lokasi aset..."></textarea>
                            </div>
                            <div class="form-group mb-5">
                                <div class="checkbox-inline">
                                    <label class="checkbox">
                                        <input class="form-check-input" type="checkbox" id="true_koordinat_aset" name="true_koordinat_aset" />
                                        <span></span> Gunakan titik koordinat lokasi aset
                                    </label>
                                </div>
                                <span class="form-text text-muted">Tentukan titik koordinat lokasi Aset melalui map area.</span>
                                <span class="form-text text-danger" id="geolocationInfo"></span>
                                <div class="row">
                                    <div class="col-lg-12 mt-3 hideMaps" style="display: none;" id="col-lokasiAset_map"></div>
                                    <div class="input-group mt-3 hideMaps col-lg-6" style="display: none;">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="bi bi-geo-alt fs-1"></i></span>
                                        </div>
                                        <input type="text" id="koord_lat" name="koord_lat" class="form-control" maxlength="100" placeholder="-7.299712367448958">
                                    </div>
                                    <div class="input-group mt-3 hideMaps col-lg-6" style="display: none;">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="bi bi-geo-alt fs-1"></i></span>
                                        </div>
                                        <input type="text" id="koord_lng" name="koord_lng" class="form-control" maxlength="100" placeholder="112.7318562970156">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-5">
                                <label for="tahun_pengadaan">Tahun Pengadaan: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="bi bi-calendar-minus-fill fs-1"></i></span>
                                    </div>
                                    <input type="text" id="tahun_pengadaan" name="tahun_pengadaan" class="form-control year" placeholder="Isi tahun pengadaan aset...">
                                </div>
                            </div>
                            <div class="form-group mb-5">
                                <label for="harga_pengadaan">Harga Pengadaan: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Rp.</span>
                                    </div>
                                    <input type="text" id="harga_pengadaan" name="harga_pengadaan" class="form-control rp" placeholder="Isi harga pengadaan aset...">
                                </div>
                                <span class="form-text text-muted">*) Isi dengan: <code>0</code> Jika tidak ada</span>
                            </div>
                            <div class="form-group mb-5">
                                <label for="harga_sekarang">Harga Sekarang: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Rp.</span>
                                    </div>
                                    <input type="text" id="harga_sekarang" name="harga_sekarang" class="form-control rp" placeholder="Isi harga aset saat ini...">
                                </div>
                                <span class="form-text text-muted">*) Isi dengan: <code>0</code> Jika tidak ada</span>
                            </div>
                            <div class="form-group mb-5" id="fg-thumbnail">
                                <label for="thumbnail">Thumbnail: <span class="text-danger">*</span></label>
                                <input type="file" class="dropify-upl mb-3 mb-lg-0" id="thumbnail" name="thumbnail" accept=".png, .jpg, .jpeg" data-show-remove="false" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="2M" />
                                <span class="form-text text-muted">*) Maksimal size: <code>2MB</code>, File Allow: <code>*.jpg | *.jpeg | *.png</code></span>
                            </div>
                            <div class="form-group mb-5">
                                <label for="spesifikasi_aset">Spesifikasi: <span class="text-danger">*</span></label>
                                <textarea id="spesifikasi_aset" name="spesifikasi_aset" class="form-control" placeholder="Isi spesifikasi aset..."></textarea>
                                <span class="form-text mt-3 text-muted">*) Isi dengan: <code>-</code> Jika tidak ada</span>
                            </div>
                            <div class="form-group mb-5" id="fg-fidstatus" style="overflow: hidden;">
                                <label for="fid_status">Status: <span class="text-danger">*</span></label>
                                <select id="fid_status" name="fid_status" class="form-control selectpicker show-tick" data-container="#col-formAset" data-live-search="true" title="Pilih status aset..."></select>
                                <a href="javascript:void(0);" id="btn-addNewStatusAset" class="text-primary" onclick="addNewStatusAset();">+ Tambahkan status aset baru</a>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" id="btn-save1" class="btn btn-sm btn-primary me-2"><i class="far fa-save"></i> Simpan</button>
                        <button type="button" id="btn-reset1" class="btn btn-sm btn-secondary"><i class="flaticon2-refresh-1"></i> Reset</button>
                    </div>
                </form>
            </div>
            <div class="tab-pane fade " id="formAset2" role="tabpanel" aria-labelledby="tabs-formAset2">
                <div class="row mb-10" id="row-formFileAset" style="display: none;">
                    <div class="col-lg-12">
                        <h3 class="font-size-lg text-dark font-weight-bold mb-5">Form Tambah File Data Aset</h3>
                        <form class="form" autocomplete="off" id="form-aset2" >
                            <input type="hidden" name="id_aset"><input type="hidden" name="kode_aset_uplfile">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group mb-5">
                                        <label for="namafile_aset">Nama File: </label>
                                        <input type="text" id="namafile_aset" name="namafile_aset" class="form-control" maxlength="100" placeholder="Isi nama file data aset...">
                                    </div>
                                    <div class="form-group" id="fg-fileAset">
                                        <label for="file_aset">File: </label>
                                        <div id="file_aset_view" class="mb-3" style="display: none;"></div>
                                        <input id="file_aset" name="file_aset" type="file" class="form-control" accept=".pdf, .jpeg, .jpg, .png," data-msg-placeholder="Pilih {files}...">
                                        <span class="form-text text-muted">*) Type file: <code>*.pdf, *.jpg, *.jpeg,*.png</code></span>
                                        <span class="form-text text-muted">*) Size file Maks. <code>10MB</code></span>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" id="btn-save2" class="btn btn-sm btn-primary me-2"><i class="fas fa-upload"></i> Upload</button>
                                <button type="button" id="btn-batalUploadFileAset" class="btn btn-sm btn-secondary"><i class="bi bi-x-lg"></i> Batal</button>
                            </div>
                        </form>
                        <div class="separator separator-solid separator-border-2 mt-10"></div>
                    </div>
                </div>
                <div class="row" id="row-dataFileAset">
                    <div class="col-lg-12">
                        <div class="d-flex mb-10">
                            <div class="flex-fill align-self-center">
                                <h3 class="font-size-lg text-dark font-weight-bold">File Data Aset</h3>
                            </div>
                            <div class="ml-auto">
                                <!--begin::Button-->
                                <button type="button" class="btn btn-sm btn-info font-weight-bolder" id="btnAdd_fileDataAset"><i class="fas fa-plus"></i> Tambah File</button>
                                <!--end::Button-->
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="dt-fileAset" class="table table-hover table-head-custom dtr-inline w-100">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="align-middle">No</th>
                                        <th class="align-middle">Nama File</th>
                                        <th class="align-middle">File</th>
                                        <th class="text-center text-center align-middle">Aksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </div>
    <!--end::Form-->
</div>
<!--end::Card Form-->
<!--begin::List Table Data-->
<div class="card shadow" id="col-dtAset">
    <!--begin::Card header-->
    <div class="card-header">
        <div class="card-title">
            <h3 class="fw-bolder fs-2 text-gray-900">
                <i class="fas fa-th-list fs-2 text-gray-900 me-2"></i> Kelola Data Aset
            </h3>
        </div>
        <div class="card-toolbar">
            <div class="dropdown dropdown-export show me-2">
                <a class="btn btn-secondary btn-sm font-weight-bolddropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="la la-download"></i> Export
                </a>
                <div class="dropdown-menu dropdown-export-menu" aria-labelledby="dropdownMenuLink">
                    <span class="text-muted font-weight-bold text-hover-primary" style="margin-left: 10px">Pilihan Export</span>
                    <a class="dropdown-item " id="export_print" href="javascript:void(0)"><i class="bi bi-file-earmark-pdf-fill me-1 align-middle align-center"></i> Print</a>
                    <a class="dropdown-item " id="export_excel" href="javascript:void(0)"><i class="bi bi-file-earmark-excel-fill me-1 align-middle align-center"></i> Excel</a>
                    <a class="dropdown-item " id="export_copy" href="javascript:void(0)"><i class="bi bi-files me-1 align-middle align-center"></i> Salin</a>
                </div>
            </div>
            <div class="d-flex justify-content-end me-2">
                <button type="button" onclick="_importDataAset()" class="btn btn-dark btn-sm font-weight-bold" ><i class="bi bi-cloud-upload-fill "></i> Import</button>
            </div>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary me-2" id="btn-addSlide" onclick="_add_aset();"><i class="las la-plus fs-3"></i> Tambah</button>
            </div>
        </div>
    </div>
    <!--end::Card header-->
    <div class="card-body">
        <form class="form" id="form-filterDtAset">
    
            <div class="form-group row m-0 mb-10">
                <label class="col-form-label col-lg-2 col-sm-12">Filter Data Aset: </label>
                <div class="col-lg-4 col-sm-12">
                    <div class="form-group" style="overflow: hidden;">
                        <select id="filterDt-jenisAset" name="filterDt-jenisAset" class="form-control selectpicker show-tick" data-container="#col-dtAset" data-live-search="true" title="Filter jenis aset..."></select>
                        <input type="hidden" name="filterDt-jenisAset-fromBeranda" id="filterDt-jenisAset-fromBeranda" value="" />
                    </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12">
                    <div class="form-group">
                        <select id="filterDt-statusAset" name="filterDt-statusAset" class="form-control selectpicker show-tick" data-container="#col-dtAset" title="Filter status aset..."></select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <!--begin::Button-->
                    <button type="button" class="btn btn-sm btn-block btn-outline-dark font-weight-bolder" id="btnResetFilter"><i class="la la-undo-alt"></i> Reset</button>
                    <!--end::Button-->
                </div>
            </div>
        </form>
        <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-hover table-head-custom align-middle table-row-bordered border w-100 gy-3 gs-3" id="dt-aset">
                <thead class="table-dark">
                    <tr class="fw-bolder text-uppercase bg-dark text-white">
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">No.</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">ASET</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">NAMA</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">NUP</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">TAHUN</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">HARGA PENGADAAN(Rp)</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">HARGA SEKARANG(Rp)</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">STATUS</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">THUMNAIL</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">Aksi</th>
                    </tr>
                </thead>
            </table>
            <!--end::Table-->
        </div>
    </div>
</div>
<!--end::List Table Data-->


<!-- begin Modal Add New Jenis Aset-->
<div class="modal fade" id="modalImportAset" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body" data-scroll="true" data-height="300">
                <form class="form" autocomplete="off" id="form-import">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="alert alert-success" role="alert">
                                <div class="d-flex align-center align-middle">
                                    <i class="bi bi-megaphone-fill fs-3 text-danger me-4"></i>
                                    <h5 class="fw-bolder fs-3 text-gray-900">
                                        Informasi :
                                    </h5>
                                </div>
                                <div class="informasi">
                                    <ul>
                                        <li class="text-gray-900">File yang diinputkan harus bersifat <span class="text-danger">Excel</span>.</li>
                                        <li class="text-gray-900">Sesuaikan format import excel dengan tidak menghilangkan data header, format excel dapat di download <a href="{{ route('mastering-template-data-aset') }}" data-bs-toggle="tooltip" title="Download Format Import Excel!">Disini</a></li>
                                        <li class="text-gray-900">Sesuaikan Data(<b>Jenis Aset, Satuan Aset dan Status Aset</b>) Sesuai Dengan <span class="text-danger"> Id </span> Data Mastering Yang Sudah Ada, Data Mastering Dapat di Download <a href="{{ route('mastering-excel-download') }}" data-bs-toggle="tooltip" title="Download Data Mastering!">Disini</a></li>
                                        <li class="text-gray-900">Semua Row Excel Wajib Diisi Jika Data Kosong/Tidak Ada, Maka Isi Dengan <span class="text-danger"> (0) Untuk Data Yang Sifatnya Number/Angka</span> dan <span class="text-danger"> (-) Untuk Data Yang Sifatnya Isian</span></li>
                                    </ul>
                                </div>
                              </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-5" id="fg-fileAset">
                                <label for="file_excel">File Import: <span class="text-danger">*</span></label>
                                <input type="file" class="dropify-upl mb-3 mb-lg-0" id="file_excel" name="file_excel" accept=".xls, .xlsx" data-show-remove="false" />
                                <span class="form-text text-muted">*)File Yang diijinkan: <code>*xls *xlsx</code></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn-saveImport" class="btn btn-primary font-weight-bold"><i class="la la-download"></i> Import</button>
                <button type="button" onclick="_closeModal()" class="btn btn-danger font-weight-bold" aria-label="Close" data-dismiss="modal"><i class="bi bi-x-lg"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>
<!-- end Modal Add New Jenis Aset-->
<!-- begin Modal Add New Jenis Aset-->
<div class="modal fade" id="newjenisModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body" data-scroll="true" data-height="300">
                <form class="form" autocomplete="off" id="form-newJenis">
                    <input type="hidden" name="methodform_jenisaset">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-5">
                                <label for="kode_jenis_aset">Kode Jenis Aset: <span class="text-danger">*</span></label>
                                <input type="text" class="form-control mask-12 no-space" placeholder="Isikan kode jenis aset..." name="kode_jenis_aset" id="kode_jenis_aset" maxlength="12">
                                <span class="form-text text-muted">*) Maksimal <span class="text-danger">12 Karakter</span> | Tanpa Spasi | Hanya Angka</span>
                            </div>
                            <div class="form-group mb-5">
                                <label for="jenis_aset">Jenis Aset: <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Isikan nama jenis aset..." name="jenis_aset" id="jenis_aset" maxlength="100">
                            </div>
                            <div class="form-group mb-5">
                                <label for="deskjenis_aset">Deskripsi: </label>
                                <textarea type="text" id="deskjenis_aset" name="deskjenis_aset" class="form-control" maxlength="200" rows="3" style="min-height:50px;max-height:150px;" placeholder="Isi deksripsi jenis aset..." ></textarea>
                            </div>
                            <div class="form-group mb-5">
                                <label for="iconjenis_aset">Icon: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="sample_iconjenis_aset">...</span>
                                    </div>
                                    <input type="text" class="form-control no-space" id="iconjenis_aset" name="iconjenis_aset" placeholder="Isi icon jenis aset..." maxlength="50">
                                </div>
                                <span class="form-text text-muted">*) Contoh input: <b class="text-dark">arrow-through-heart</b></span>
                                <span class="form-text text-muted">*) List icon dapat lihat <a href="https://icons.getbootstrap.com/" class="text-dark" data-toggle="tooltip" data-theme="dark" title="Lihat list icon!" target="_blank"><b>Disini</b></a></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn-saveJenis" class="btn btn-primary font-weight-bold"><i aria-hidden="true" class="far fa-save"></i> Simpan</button>
                <button type="button" onclick="_closeModal()" class="btn btn-danger font-weight-bold" aria-label="Close" data-dismiss="modal"><i class="bi bi-x-lg"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>
<!-- end Modal Add New Jenis Aset-->
<!-- begin Modal Add New Status Aset-->
<div class="modal fade" id="newstatusModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body" data-scroll="true" data-height="300">
                <form class="form" autocomplete="off" id="form-newStatus">
                    <input type="hidden" name="methodform_statusaset">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-5">
                                <label for="status_aset">Status Aset: <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Isikan nama status aset..." name="status_aset" id="status_aset" maxlength="100">
                            </div>
                            <div class="form-group mb-5">
                                <label for="iconstatus_aset">Icon: <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="sample_iconstatus_aset">...</span>
                                    </div>
                                    <input type="text" class="form-control no-space" id="iconstatus_aset" name="iconstatus_aset" placeholder="Isi icon status aset..." maxlength="50">
                                </div>
                                <span class="form-text text-muted">*) Contoh input: <b class="text-dark">arrow-through-heart</b></span>
                                <span class="form-text text-muted">*) List icon dapat lihat <a href="https://icons.getbootstrap.com/" class="text-dark" data-toggle="tooltip" data-theme="dark" title="Lihat list icon!" target="_blank"><b>Disini</b></a></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn-saveStatus" class="btn btn-primary font-weight-bold"><i aria-hidden="true" class="far fa-save"></i> Simpan</button>
                <button type="button" onclick="_closeModal()" class="btn btn-danger font-weight-bold" aria-label="Close" data-dismiss="modal"><i class="bi bi-x-lg"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>
<!-- end Modal Add New Status Aset-->
<!-- begin Modal Add New Satuan Aset-->
<div class="modal fade" id="newsatuanModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body" data-scroll="true" data-height="300">
                <form class="form" autocomplete="off" id="form-newSatuan">
                    <input type="hidden" name="methodform_satuanaset">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="satuan_aset">Satuan Aset: <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Isikan nama satuan aset..." name="satuan_aset" id="satuan_aset" maxlength="100">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn-saveSatuan" class="btn btn-primary font-weight-bold"><i aria-hidden="true" class="far fa-save"></i> Simpan</button>
                <button type="button" onclick="_closeModal()" class="btn btn-danger font-weight-bold" aria-label="Close" data-dismiss="modal"><i class="bi bi-x-lg"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>
<!--end Modal Add New Satuan Aset-->
<!--begin Detail Aset-->
<div class="modal fade" id="detailasetModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="scroll scroll-pull" data-scroll="true" data-height="400">
                    <!-- begin: Detail Data Aset-->
                    <div class="row justify-content-center" id="dtlDataAset_mdl"></div>
                    <!-- end: Detail Data Aset-->
                </div>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-primary font-weight-bold" onclick="printDiv('printareaDetailAset');"><i aria-hidden="true" class="la la-print"></i> Print</button>-->
                <button type="button" onclick="_closeModal()" class="btn btn-danger font-weight-bold" aria-label="Close" data-dismiss="modal"><i class="bi bi-x-lg"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>
<!--end Modal Detail Aset-->

@section('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js"></script>
<script src="{{ asset('/dist/js/jquery.mask.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/summernote/summernote-lite.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/summernote/summernote-lite.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/summernote/lang/summernote-id-ID.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/dropify-master/js/dropify.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('dist/plugins/bootstrap-file-input/js/plugins/piexif.js') }}"></script>
<script type="text/javascript" src="{{ asset('dist/plugins/bootstrap-file-input/js/plugins/sortable.js') }}"></script>
<script type="text/javascript" src="{{ asset('dist/plugins/bootstrap-file-input/js/fileinput.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('dist/plugins/bootstrap-file-input/themes/fas/theme.js') }}"></script>
<script type="text/javascript" src="{{ asset('dist/plugins/bootstrap-file-input/themes/explorer-fas/theme.js') }}"></script>
<script src="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-select/js/bootstrap-select.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/Magnific-Popup/jquery.magnific-popup.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-select/js/bootstrap-select.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ asset('/dist/js/backend_app.init.js') }}"></script>
<script src="{{ asset('/script/backend/data_aset.js') }}"></script>
@stop
@endsection