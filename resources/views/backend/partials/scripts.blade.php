<!--begin::Javascript-->
<script>
    var hostUrl = "{{ asset('/dist/') }}";
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!--begin::Global Javascript Bundle(mandatory for all pages)-->
<script src="{{ asset('/dist/plugins/global/plugins.bundle.v817.js') }}"></script>
{{-- <script src="{{ asset('/dist/plugins/bootstrap-select/js/bootstrap-select.js') }}"></script> --}}
<script src="{{ asset('/dist/js/scripts.bundle.v817.js') }}"></script>
<!--end::Global Javascript Bundle-->
<!--begin::Vendors Javascript(used for this page only)-->
<script src="{{ asset('/dist/plugins/Magnific-Popup/jquery.magnific-popup.min.js') }}"></script>
@yield('js')
<script src="{{ asset('/dist/js/backend_app.init.js') }}"></script>
<!--end::Vendors Javascript-->
<!--end::Javascript-->