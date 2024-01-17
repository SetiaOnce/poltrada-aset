@extends('backend.layouts', ['activeMenu' => 'STATUS_ASET', 'activeSubMenu' => 'MASTERISASI', 'title' => 'Masterisasi Status Aset'])
@section('content')
@section('css')
<link href="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.css') }}" rel="stylesheet" type="text/css" /> 
<link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.min.css') }}" rel="stylesheet" type="text/css" /> 
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
    <form id="form-data" class="form" onsubmit="return false">
        <input type="hidden" id="id" name="id" />
        <!--begin::Card body-->
        <div class="card-body">
            <!--begin::Row-->
            <div class="row">
                <div class="col-md-12">
                    <!--begin::Input group-->
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-bold fs-6" for="status_aset">Status Aset</label>
                        <div class="col-lg-8">
                            <input type="text" name="status_aset" id="status_aset" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" maxlength="50" placeholder="Isikan status aset ..." />
                            <div class="form-text">*) Maximal : <code>*50 </code> Karakter</div>
                        </div>
                    </div>
                    <!--end::Input group-->
                    <!--begin::Input group-->
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-bold fs-6" for="icon">Icon</label>
                        <div class="col-lg-8">
                            <input type="text" name="icon" id="icon" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" maxlength="120" placeholder="Isikan icon ..." />
                            <div class="form-text">*) Contoh Input : <small class="text-info">arrow-through-heart</span>
                            {{-- <div class="form-text">*) Contoh Input : <small class="text-info"><span class="code">&lt;i class="bi bi-0-circle"&gt;&lt;/i&gt;</span> --}}
                            </small></div>
                            <div class="form-text">*) Lihat Contoh Icon Lainnya : <a href="https://icons.getbootstrap.com/" target="_blank">Disini</a></div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
            </div>
            <!--end::Row-->
        </div>
        <!--end::Card body-->
        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
            <button type="button" class="btn btn-light btn-active-light-danger me-2" id="btn-reset" onclick="_clearForm();"><i class="las la-redo-alt fs-1 me-3"></i>Batal</button>
            <button type="button" class="btn btn-primary" id="btn-save"><i class="las la-save fs-1 me-3"></i>Simpan</button>
        </div>
        <!--end::Actions-->
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
                <i class="fas fa-th-list fs-2 text-gray-900 me-2"></i> Data Master Status Aset
            </h3>
        </div>
        <div class="card-toolbar">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary me-2" id="btn-addSlide" onclick="_addData();"><i class="las la-plus fs-3"></i> Tambah</button>
            </div>
        </div>
    </div>
    <!--end::Card header-->
    <div class="card-body">
        <div class="d-flex flex-wrap justify-content-center align-items-center mb-5">
            <div class="ms-auto">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative me-3 mb-md-0 mb-3">
                    <div class="input-group input-group-sm input-group-solid border">
                        <span class="input-group-text"><i class="las la-search fs-3"></i></span>
                        <input type="text" class="form-control form-control-sm form-control-solid w-250px border-left-0" name="search-dtTable" id="search-dtTable" placeholder="Pencarian..." />
                        <span class="input-group-text border-left-0 cursor-pointer text-hover-danger" id="clear-searchdtTable" style="display: none;">
                            <i class="las la-times fs-3"></i>
                        </span>
                    </div>
                </div>
                <!--end::Search-->
            </div>
        </div>
        <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-rounded align-middle table-row-bordered border" id="dt-status">
                <thead>
                    <tr class="fw-bolder text-uppercase bg-light">
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">No.</th>
                        <th class="align-middle px-2 border-bottom-2 border-gray-200">Status</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">Icon</th>
                        <th class="text-center align-middle px-2 border-bottom-2 border-gray-200">Aksi</th>
                    </tr>
                </thead>
            </table>
            <!--end::Table-->
        </div>
    </div>
</div>
<!--end::List Table Data-->

@section('js')
<script src="{{ asset('/dist/plugins/custom/datatables/datatables.bundle.v817.js') }}"></script>
<script src="{{ asset('/dist/plugins/bootstrap-select/js/bootstrap-select.min.js') }}"></script>
<script src="{{ asset('/dist/js/backend_app.init.js') }}"></script>
<script src="{{ asset('/script/backend/status_aset.js') }}"></script>
@stop
@endsection