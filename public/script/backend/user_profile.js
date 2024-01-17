const _loadDashboard = () => {
    setTimeout(
        function() {
            $.ajax({
                url: BASE_URL+ "/app_admin/load_user_profile",
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    $('#dtlUserInfo').html(data.output);
                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Load data is error');
                }
            });
        }, 500);
}

// Class Initialization
jQuery(document).ready(function() {
    _loadDashboard();
});