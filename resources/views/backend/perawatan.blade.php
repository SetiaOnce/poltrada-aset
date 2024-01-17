@extends('backend.layouts', ['activeMenu' => 'PERAWATAN', 'activeSubMenu' => '', 'title' => 'Perawatan Aset'])
@section('content')
@section('css')
<link href="{{ asset('/dist/plugins/dropify-master/css/dropify.min.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.min.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/Magnific-Popup/magnific-popup.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/plugins/summernote/summernote-lite.min.css') }}" rel="stylesheet" type="text/css" /> 
@endsection

<!--begin::Card Form-->
<div class="card" id="card-form" style="display: none;">
    <!--begin::Card header-->
    <div class="card-header">
        <div class="card-title"></div>
        <div class="card-toolbar">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn btn-bg-light btn-color-danger me-2" id="btn-closeFormSlide" onclick="_closeCard('form_slide');"><i class="fas fa-times"></i> Tutup</button>
            </div>
        </div>
    </div>
    <!--end::Card header-->
    <!--begin::Form-->
    <form class="form" autocomplete="off" id="form-data">
        <input type="hidden" name="id"><input type="hidden" name="methodform_perawatanAset">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-12 mb-5">
                    <div class="form-group">
                        <label for="fid_aset">Aset: <span class="text-danger">*</span></label>
                        <select class="form-select" name="fid_aset" id="fid_aset"></select>
                        </select>
                        <span class="form-text text-muted">*) Pencarian aset: Nama, NUP, dan No. Registrasi</span>
                    </div>
                </div>
            </div>
            <!-- begin: Detail Data Aset-->
            <div class="row" id="dtl_dataAset"></div>
            <!-- end: Detail Data Aset-->
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-group mb-5">
                        <label for="tanggal_perawatan">Tanggal Perawatan: <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="bi bi-calendar-minus-fill fs-1"></i></span>
                            </div>
                            <input type="text" id="tanggal_perawatan" name="tanggal_perawatan" class="form-control " placeholder="Isi tanggal perawatan aset...">
                        </div>
                        <span class="form-text text-muted">*) Format: dd/mm/yyyy</span>
                    </div>
                    <div class="form-group mb-5">
                        <label for="judul_kegiatan">Judul Kegiatan: <span class="text-danger">*</span></label>
                        <input type="text" id="judul_kegiatan" name="judul_kegiatan" class="form-control" placeholder="Isi judul kegiatan...">
                    </div>
                    <div class="form-group mb-5">
                        <label for="keterangan_perawatan">Keterangan: <span class="text-danger">*</span></label>
                        <textarea id="keterangan_perawatan" name="keterangan_perawatan" class="form-control" placeholder="Isi keterangan perawatan..."></textarea>
                        <span class="form-text mt-3 text-muted">*) Isi dengan: <code>-</code> Jika tidak ada</span>
                    </div>

                    <div class="form-group mb-5" id="fg-fotoPerawatan">
                        <label for="foto_perawatan">Foto: <span class="text-danger">*</span></label>
                        <input type="file" class="dropify-upl mb-3 mb-lg-0" id="foto_perawatan" name="foto_perawatan" accept=".png, .jpg, .jpeg" data-show-remove="false" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="2M" />
                        <span class="form-text text-muted">*) Maksimal size: <code>2MB</code>, File Allow: <code>*.jpg | *.jpeg | *.png</code></span>
                    </div>

                    <div class="form-group mb-5" id="fg-filePdf">
                        <label for="file_pdf">File Perawatan: <span class="text-danger">*</span></label>
                        <input type="file" class="dropify-upl mb-3 mb-lg-0" id="file_pdf" name="file_pdf" accept=".pdf" data-show-remove="false" data-allowed-file-extensions="pdf" data-max-file-size="10M" />
                        <span class="form-text text-muted">*) Maksimal size: <code>10MB</code>, File Allow: <code>*.pdf</code></span>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="button" id="btn-save" class="btn btn-sm btn-primary me-2"><i class="far fa-save"></i> Simpan</button>
                <button type="button" id="btn-reset" class="btn btn-sm btn-secondary"><i class="flaticon2-refresh-1"></i> Reset</button>
            </div>
        </div>
    </form>
    <!--end::Form-->
</div>
<!--end::Card Form-->
<!--begin::List Table Data-->
<div class="card shadow" id="card-data">
    <!--begin::Card header-->
    <div class="card-header">
        <div class="card-title">
            <h3 class="fw-bolder fs-2 text-gray-900">
                <i class="fas fa-th-list fs-2 text-gray-900 me-2"></i> Data Perawatan Aset
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
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary me-2" data-bs-toggle="tooltip" title="Tambah data perawatan aset baru!" onclick="_addData();"><i class="las la-plus fs-3"></i> Tambah</button>
            </div>
        </div>
    </div>
    <!--end::Card header-->
    <div class="card-body">
        <div class="form-group row m-0 mb-10">
            <label class="col-form-label col-lg-2 col-sm-12">Filter Data : </label>
            <div class="col-lg-4 col-sm-12">
                <div class="form-group" style="overflow: hidden;">
                    <select id="filterDt-jenisAset" name="filterDt-jenisAset" class="form-control selectpicker show-tick" data-container="#card-data" data-live-search="true" title="Filter jenis aset..."></select>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 col-sm-12">
                <?php date_default_timezone_set("Asia/Jakarta"); $dateToday = date('d/m/Y'); ?>
                <!--begin::Input group-->
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm date-flatpickr" name="filterDt-startDate" id="filterDt-startDate" maxlength="10" value="{{ $dateToday; }}" placeholder="dd/mm/YYYY" readonly />
                    <span class="input-group-text">s/d</span>
                    <input type="text" class="form-control form-control-sm date-flatpickr" name="filterDt-endDate" id="filterDt-endDate" maxlength="10" value="{{ $dateToday; }}" placeholder="dd/mm/YYYY" readonly />
                </div>
                <!--end::Input group-->
            </div>
            <div class="col-lg-2">
                <!--begin::Button-->
                <button type="button" class="btn btn-sm btn-block btn-dark font-weight-bolder" id="btnResetFilter"><i class="la la-undo-alt"></i> Reset</button>
                <!--end::Button-->
            </div>
        </div>
        <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-rounded align-middle table-row-bordered nowrap border" id="dt-perawatanAset">
                <thead>
                    <tr class="fw-bolder text-uppercase bg-light">
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">No.</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Jenis Aset</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Data Aset</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Unit Kerja</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Tgl.Perawatan</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Foto Perawatan</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">Aksi</th>
                    </tr>
                </thead>
            </table>
            <!--end::Table-->
        </div>
    </div>
</div>
<!--end::List Table Data-->

<!--begin Detail Aset-->
<div class="modal fade" id="detailModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
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
                    <div class="row justify-content-center" id="modalDetailAset"></div>
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
<script src="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-select/js/bootstrap-select.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/Magnific-Popup/jquery.magnific-popup.min.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ asset('/dist/js/backend_app.init.js') }}"></script>
<script src="{{ asset('/script/backend/perawatan_aset.js') }}"></script>
@stop
@endsection