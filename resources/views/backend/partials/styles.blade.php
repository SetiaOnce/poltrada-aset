<!--begin::Fonts(mandatory for all pages)-->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" />
<!--end::Fonts-->
<!-- Maps Source -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" rel="stylesheet">
<!--begin::Vendor Stylesheets(used for this page only)-->
<link rel="stylesheet" href="{{ asset('/dist/plugins/Magnific-Popup/magnific-popup.css') }}">
<!--end::Vendor Stylesheets-->
<!--begin::Global Stylesheets Bundle(mandatory for all pages)-->
{{-- <link href="{{ asset('/dist/plugins/bootstrap-select/css/bootstrap-select.css') }}" rel="stylesheet" type="text/css" /> --}}
<link href="{{ asset('/dist/plugins/global/plugins.bundle.v817.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/css/style.bundle.v817.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('/dist/css/style.init.css') }}" rel="stylesheet" type="text/css" />
<!--end::Global Stylesheets Bundle-->
<!-- Base Route JS -->
@yield('css')
<script src="{{ asset('/dist/js/base_route.js') }}"></script>
<script>
    var BASE_URL = "{{url('/')}}";
</script> 