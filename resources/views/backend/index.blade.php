@extends('backend.layouts', ['activeMenu' => 'DASHBOARD', 'activeSubMenu' => '', 'title' => 'Dasboard'])
@section('css')
<link rel="stylesheet" href="{{ asset('/dist/plugins/apexchart/apexcharts.css') }}" type="text/css">
<style>
#trend-pendataanAset .apexcharts-tooltip {
  color: #000000;
}

#trend-pendataanAset .apexcharts-tooltip .apexcharts-tooltip-series-group.active {
  background: #ffffff !important;
}
</style>
@stop
@section('content')
<!--begin:: Widgetfirst-->
<div class="row mb-5 mb-xl-10">
    <div class="col-xl-12">
        <div class="row" id="firstWidget">
            <div class="col-lg-4">
                <svg class="bd-placeholder-img rounded w-100 h-110px app-sidebar-logo-default" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                </svg>
            </div>
            <div class="col-lg-4">
                <svg class="bd-placeholder-img rounded w-100 h-110px app-sidebar-logo-default" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                </svg>
            </div>
            <div class="col-lg-4">
                <svg class="bd-placeholder-img rounded w-100 h-110px app-sidebar-logo-default" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                </svg>
            </div>
        </div>
    </div>
</div>
<!--End:: Widgetfirst-->

<!--begin:: Trend Aset Pertahun-->
<div class="card mb-5 mb-xl-10">
    <div class="card-body">
        <div id="trend-asetPertahun"></div>
        <div id="loader">
            <svg class="bd-placeholder-img  w-100 h-210px app-sidebar-logo-default" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
            <svg class="bd-placeholder-img  w-100 h-210px app-sidebar-logo-default" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
        </div>
    </div>
</div>
<!--begin:: End Aset Pertahun-->

<!--begin:: Trend Aset Pertahun-->
<div class="card mb-5 mb-xl-10">
    <div class="card-body">
        <div id="trend-pendataanAset"></div>
        </div>
    </div>
</div>
<!--begin:: End Aset Pertahun-->

@section('js')
<script src="{{ asset('/dist/plugins/apexchart/apexcharts.js') }}"></script>
<script src="{{ asset('/script/backend/dashboard.js') }}"></script>
@stop
@endsection