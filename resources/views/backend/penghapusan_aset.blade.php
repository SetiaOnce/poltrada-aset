@extends('backend.layouts', ['activeMenu' => 'PENGHAPUSAN_ASET', 'activeSubMenu' => '', 'title' => 'Penghapusan Aset'])
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

<!--begin::List Table Data-->
<div class="card shadow" id="card-data">
    <!--begin::Card header-->
    <div class="card-header">
        <div class="card-title">
            <h3 class="fw-bolder fs-2 text-gray-900">
                <i class="fas fa-th-list fs-2 text-gray-900 me-2"></i> List Data Aset
            </h3>
        </div>
    </div>
    <!--end::Card header-->
    <div class="card-body">
        <div class="form-group row m-0 mb-10">
            <div class="col-lg-4 col-sm-12">
                <div class="form-group" style="overflow: hidden;">
                    <select id="filterDt-jenisAset" name="filterDt-jenisAset" class="form-control selectpicker show-tick" data-container="#card-data" data-live-search="true" title="Filter jenis aset..."></select>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 col-sm-12">
                <!--begin::Input group-->
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm number numberOnlyMax12" name="filterDt-nupawal" id="filterDt-nupawal" maxlength="10" placeholder="NUP Awal"/>
                    <span class="input-group-text">s/d</span>
                    <input type="text" class="form-control form-control-sm number numberOnlyMax12" name="filterDt-nupakhir" id="filterDt-nupakhir" maxlength="10" placeholder="NUP Akhir"/>
                </div>
                <!--end::Input group-->
            </div>
            <div class="col-lg-4">
                <div class="d-flex flex-column flex-sm-row d-grid gap-2">
                    <!--begin::Button-->
                    <button type="button" class="btn btn-sm btn-block btn-info font-weight-bolder" id="btnSearchData"><i class="bi bi-search"></i> Cari</button>
                    <!--end::Button-->
                    <!--begin::Button-->
                    <button type="button" class="btn btn-sm btn-block btn-dark font-weight-bolder" id="btnResetFilter"><i class="la la-undo-alt"></i> Reset</button>
                    <!--end::Button-->
                </div>
            </div>
        </div>
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
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">#</th>
                    </tr>
                </thead>
                <tbody class="fs-8"></tbody>
            </table>
            <!--end::Table-->
        </div>
    </div>
</div>
<!--end::List Table Data-->

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
<script src="{{ asset('/script/backend/penghapusan_aset.js') }}"></script>
@stop
@endsection
