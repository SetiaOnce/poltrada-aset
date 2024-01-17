<?php

use App\Http\Controllers\Backend\DataAsetController;
use App\Http\Controllers\Backend\MasterJenisAsetController;
use App\Http\Controllers\Backend\MasterSatuanAsetController;
use App\Http\Controllers\Backend\MasterStatusAsetController;
use App\Http\Controllers\Backend\PemeriksaanAsetController;
use App\Http\Controllers\Backend\PenghapusanAsetController;
use App\Http\Controllers\Backend\PerawatanAsetController;
use App\Http\Controllers\Backend\ProfileAppController;
use App\Http\Controllers\CommonController;
use App\Http\Controllers\Login\LoginController;
use App\Http\Controllers\SelectController;
use App\Models\GroupApp;
use App\Models\SsoAplikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

Route::get('/', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    return redirect('/login'); 
});

//  ===========>> FOR LOGIN  <<============== //
Route::group(['prefix' => 'front'], function () {
    Route::controller(LoginController::class)->group(function(){
        Route::get('/load_login_info', 'loadLoginInfo');
    });
});
//  ===========>> END LOGIN <<============== //

Route::get('/reloadcaptcha', function () {
	return captcha_img();
});
Route::controller(LoginController::class)->group(function(){
    Route::get('/login', 'index');
    Route::post('/ajax_login', 'login');
});
Route::get('/logout', function () {
    Session::flush();
    return redirect('/'); 
});

//  ===========>> SELECT START <<============== //
Route::group(['prefix' => 'select'], function () {
    Route::get('/ajax_getjenisaset', [SelectController::class, 'jenisAset']);
    Route::get('/ajax_getstatusaset', [SelectController::class, 'statusAset']);
    Route::get('/ajax_getunitkerja', [SelectController::class, 'unitKerja']);
    Route::get('/ajax_getsatuanaset', [SelectController::class, 'satuanAset']);
    Route::get('/ajax_getdtaset', [SelectController::class, 'dataAset']);
});
//  ===========>> SELECT END <<============== //

// App Admin
Route::group(['prefix' => 'app_admin'], function () {
    Route::get('/dashboard', function () {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        } 
        $data['header_title'] = 'DASHBOARD';
        return view('backend.index', $data);
    });
    Route::get('/user_profile', function () {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        } 
        $data['header_title'] = 'USER PROFILE';
        return view('backend.common.profile', $data);
    });
    //  ===========>> CUMMON  <<============== //
    Route::get('/load_user_profile', [CommonController::class, 'loaduserProfile']);
    Route::get('/load_profile', [CommonController::class, 'loadProfile']);
    Route::get('/load_app_profile_site', [CommonController::class, 'loadProfileApp']);
    Route::post('/ajax_upload_imgeditor', [CommonController::class, 'upload_imgeditor'])->name('upload_imgeditor');
    Route::get('/download-mastering-excel', [CommonController::class, 'downloadDataMastering'])->name('mastering-excel-download');
    Route::get('/download-template-data-aset', [CommonController::class, 'downloadTemplateData'])->name('mastering-template-data-aset');
    Route::get('/get_data_aset_on_select', [CommonController::class, 'getDatAset']);
    Route::get('/load_first_widget', [CommonController::class, 'LoadFirstWidget']);
    Route::get('/load_trend_pengadaan', [CommonController::class, 'trendPengadaan']);
    Route::get('/load_trend_pendataan', [CommonController::class, 'trendPendataan']);
    //  ===========>> END COMMON <<============== //

    // for handle redirect data master
    Route::group(['prefix' => 'master'], function () {
        // for redirect page
        Route::get('/jenis_asets', [MasterJenisAsetController::class, 'index']);
        Route::get('/satuan_aset', [MasterSatuanAsetController::class, 'index']);
        Route::get('/status_aset', [MasterStatusAsetController::class, 'index']);
    });

    // for handle redirect page
    Route::get('/profile_app', [ProfileAppController::class, 'index']);
    Route::get('/data_aset', [DataAsetController::class, 'index']);
    Route::get('/perawatan_aset', [PerawatanAsetController::class, 'index']);
    Route::get('/pemeriksaan_aset', [PemeriksaanAsetController::class, 'index']);
    Route::get('/penghapusan_aset', [PenghapusanAsetController::class, 'index']);
});

// for handle ajax profile app
Route::controller(ProfileAppController::class)->group(function(){
    Route::get('/ajax/load_profile_app', 'loadProfileApp');
    Route::post('/ajax/profile_app_update', 'profileAppUpdate');
});

// for handle ajax data master
Route::group(['prefix' => 'master'], function () {
    // for handle ajax master jenis aset
    Route::controller(MasterJenisAsetController::class)->group(function(){
        Route::get('/ajax/load_jenis_aset', 'data');
        Route::get('/ajax/jenis_aset_edit', 'edit');
        Route::post('/ajax/jenis_aset_save', 'store');
        Route::post('/ajax/jenis_aset_update', 'update');
    });

    // for handle ajax master satuan aset
    Route::controller(MasterSatuanAsetController::class)->group(function(){
        Route::get('/ajax/load_satuan_aset', 'data');
        Route::get('/ajax/satuan_aset_edit', 'edit');
        Route::post('/ajax/satuan_aset_save', 'store');
        Route::post('/ajax/satuan_aset_update', 'update');
    });

    // for handle ajax master status aset
    Route::controller(MasterStatusAsetController::class)->group(function(){
        Route::get('/ajax/load_status_aset', 'data');
        Route::get('/ajax/status_aset_edit', 'edit');
        Route::post('/ajax/status_aset_save', 'store');
        Route::post('/ajax/status_aset_update', 'update');
    });
});

// for handle ajax data aset
Route::controller(DataAsetController::class)->group(function(){
    Route::post('/ajax/new_jenis_aset_save', 'addJenisAset');
    Route::post('/ajax/new_satuan_aset_save', 'addSatuanAset');
    Route::post('/ajax/new_status_aset_save', 'addStatusAset');
    Route::post('/ajax/data_aset_save', 'saveDataAset');
    Route::post('/ajax/load_data_aset', 'dataAset');
    Route::post('/ajax/load_data_file_aset', 'dataFileAset');
    Route::post('/ajax/load_data_aset_perawatan', 'loadPerawatan');
    Route::post('/ajax/load_data_aset_pemeriksaan', 'loadPemeriksaan');
    Route::get('/ajax/get_header_data_aset', 'getHeaderAset');
    Route::get('/ajax/load_detail_aset', 'detailAset');
    Route::get('/ajax/ajax_edit_aset', 'editAset');
    Route::post('/ajax/data_aset_update', 'updateAset');
    Route::post('/ajax/file_aset_save', 'saveFileAset');
    Route::post('/ajax/delete_file-aset', 'deleteFileAset');
    Route::post('/ajax/import_data_excel', 'ImportDataExcel');
});

// for handle ajax perawatan aset
Route::controller(PerawatanAsetController::class)->group(function(){
    Route::post('/ajax/load_perawatan_aset', 'data');
    Route::get('/ajax/perawatan_aset_edit', 'edit');
    Route::get('/ajax/load_detail_perawatan', 'loadDetail');
    Route::post('/ajax/perawatan_aset_save', 'store');
    Route::post('/ajax/perawatan_aset_update', 'update');
});

// for handle ajax pemeriksaan aset
Route::controller(PemeriksaanAsetController::class)->group(function(){
    Route::post('/ajax/load_pemeriksaan_aset', 'data');
    Route::get('/ajax/pemeriksaan_aset_edit', 'edit');
    Route::get('/ajax/load_detail_pemeriksaan', 'loadDetail');
    Route::post('/ajax/pemeriksaan_aset_save', 'store');
    Route::post('/ajax/pemeriksaan_aset_update', 'update');
});

// for handle ajax penghapusan data aset
Route::controller(PenghapusanAsetController::class)->group(function(){
    Route::post('/ajax/load_list_penghapusan_aset', 'data');
    Route::post('/ajax/delete_data_aset', 'deleteData');
});