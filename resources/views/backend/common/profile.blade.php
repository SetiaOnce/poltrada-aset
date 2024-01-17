@extends('backend.layouts', ['activeMenu' => 'USER_PROFILE', 'activeSubMenu' => '', 'title' => 'User Profile'])
@section('content')
<!--begin::User Info-->
<div class="card mb-5 mb-xl-10" id="cardUserInfo">
    <div class="card-body" id="dtlUserInfo">
        <div class="card" aria-hidden="true">
            <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
                <!--begin: Pic-->
                <div class="me-7 mb-4">
                    <a href="'.$response['foto'].'" class="image-popup" title="Admin PIC">
                        <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                            <svg class="bd-placeholder-img rounded w-100px h-100px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                            </svg>
                        </div>
                    </a>
                </div>
                <!--end::Pic-->
                <!--begin::Info-->
                <div class="flex-grow-1">
                    <!--begin::Detail User-->
                    <div class="d-flex flex-row flex-column border border-gray-300 border-dashed rounded w-100 py-5 px-4 me-4 my-5">
                        <!--begin::Row-->
                        <div class="row mb-7">
                            <div class="col-lg-6">
                                <div class="w-100 mb-3">
                                    <h3 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h3>
                                </div>
                                <div class="w-100 mb-3">
                                    <h3 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h3>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="w-100 mb-3">
                                    <h3 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h3>
                                </div>
                                <div class="w-100 mb-3">
                                    <h3 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h3>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="w-100 mb-3">
                                    <h3 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <!--end::Input group-->
                    </div>
                    <!--end::Detail User-->
                </div>
                <!--end::Info-->
                </div>
          </div>
    </div>
</div>
<!--end::User Info-->
@section('js')
<script src="{{ asset('/script/backend/user_profile.js') }}"></script>
@stop
@endsection