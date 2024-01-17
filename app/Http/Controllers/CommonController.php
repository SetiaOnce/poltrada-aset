<?php

namespace App\Http\Controllers;

use App\Exports\ExportMastering;
use App\Models\DataAset;
use App\Models\JenisAset;
use App\Models\ProfileApp;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Maatwebsite\Excel\Facades\Excel;
use Yajra\DataTables\Facades\DataTables;

class CommonController extends Controller
{
    public function loadProfile()
    {
        $response = array(
            'status' => TRUE,
            'nama' => session()->get('nama'),
            'foto' => session()->get('foto'),
            'level' => session()->get('level'),
        );
        
        return response()->json($response);
    }

    public function loadProfileApp()
    {
        $profile_app = ProfileApp::where('id', 1)->first();
        $response = array(
            'status' => TRUE,
            'copyright' => $profile_app->copyright,
            'backend_logo' => asset('dist/img/logo/'.$profile_app->backend_logo),
            'backend_logo' => asset('dist/img/logo/'.$profile_app->backend_logo),
            'backend_logo_icon' => asset('dist/img/logo/'.$profile_app->backend_logo_icon),
        );
        return response()->json($response);
    }

    protected function upload_imgeditor(Request $request) {
        // $form = [
        //     'image' => 'mimes:png,jpg,jpeg|max:1024',
        // ];
        // $request->validate($form);
        // try {
        //     if(!empty($_FILES['image']['name'])) {
        //         $filePath = date("m-Y");
        //         $destinationPath = public_path('/dist/img/summernote-img/' .$filePath);
        //         $file = $request->file('image');
        //         $imageExtension = $file->getClientOriginalExtension();
        //         //Cek and Create Avatar Destination Path
        //         if(!is_dir($destinationPath)){ mkdir($destinationPath, 0755, TRUE); }
        //         $imageOriginName = $file->getClientOriginalName();
        //         $imageNewName = strtolower(Str::slug(bcrypt(pathinfo($imageOriginName, PATHINFO_FILENAME)))) . time();
        //         $imageNewNameExt = $imageNewName . '.' . $imageExtension;
        //         $file->move($destinationPath, $imageNewNameExt);

        //         $data = array(
        //             "url_img" => url('dist/img/summernote-img/'.$filePath.'/'.$imageNewNameExt),
        //         );
        //     }
        //     return Response()->json(true, 'Image has been successfully upload', 200, $data);
        // } catch (Exception $exception) {
        //     return Response()->json([
        //         'status' => false
        //     ]);
        // }

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:png,jpg,jpeg|max:1024',
        ],[
            'image.max' => 'File banner tidak lebih dari 1MB.',
            'image.mimes' => 'File banner berekstensi jpg jepg png.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            $mainImage = $request->file('image');
            $filename = time() . 'custom-image.' . $mainImage->extension();
            Image::make($mainImage)->save(public_path('dist/img/summernote-img/'.$filename));
            $output = array(
                "status" => TRUE,
                "url_img" => url('dist/img/summernote-img/'.$filename),
            );
        }
        return response()->json($output);
    }

    public function loaduserProfile()
    {

        $response = array(
            'nama' => session()->get('nama'),
            'foto' => session()->get('foto'),
            'level' => session()->get('level'),
            'email' => session()->get('email'),
            'alamat' => session()->get('alamat'),
            'nik' => session()->get('nik'),
            'unit_kerja' => session()->get('unit_kerja'),
        );
        
        $output = '
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
            <a href="'.$response['foto'].'" class="image-popup" title="Admin PIC">
                <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img src="'.$response['foto'].'" alt="user-image">
                    <div class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                </div>
            </a>
        </div>
        <!--end::Pic-->
        <!--begin::Info-->
        <div class="flex-grow-1">
            <!--begin::Title-->
            <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <!--begin::User-->
                <div class="d-flex flex-column">
                    <!--begin::Name-->
                    <div class="d-flex align-items-center mb-2">
                        <a href="javascript:void(0);" class="text-gray-900 text-hover-primary fs-2 fw-bold me-1">'.$response['nama'].'</a>
                        <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" aria-label="Status user Aktif!" data-bs-original-title="Status user Aktif!"></a>
                        <span class="badge badge-light-success fw-bold ms-2 fs-8 py-1 px-3">'.$response['level'].'</span>
                    </div>
                    <!--end::Name-->
                </div>
                <!--end::User-->
            </div>
            <!--end::Title-->
            <!--begin::Detail User-->
            <div class="d-flex flex-row flex-column border border-gray-300 border-dashed rounded w-100 py-5 px-4 me-4 my-5">
                <!--begin::Row-->
                <div class="row mb-7">
                    <div class="col-lg-6">
                        <div class="w-100 mb-3">
                            <div class="fs-6 text-gray-400">Nama</div>
                            <div class="d-flex align-items-center">
                                <div class="fs-6 fw-bolder">'.$response['nama'].'</div>
                            </div>
                        </div>
                        <div class="w-100 mb-3">
                            <div class="fs-6 text-gray-400">NIK</div>
                            <div class="d-flex align-items-center">
                                <div class="fs-6 fw-bolder">'.$response['nik'].'</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="w-100 mb-3">
                            <div class="fs-6 text-gray-400">Email</div>
                            <div class="d-flex align-items-center">
                                <div class="fs-6 fw-bolder">'.$response['email'].'</div>
                            </div>
                        </div>
                        <div class="w-100 mb-3">
                            <div class="fs-6 text-gray-400">Unit Kerja</div>
                            <div class="d-flex align-items-center">
                                <div class="fs-6 fw-bolder">
                                '.$response['unit_kerja'].'
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="w-100 mb-3">
                            <div class="fs-6 text-gray-400">Alamat</div>
                            <div class="d-flex align-items-center">
                                <div class="fs-6 fw-bolder">'.$response['alamat'].'</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end::Input group-->
            </div>
            <!--end::Detail User-->
        </div>
        <!--end::Info-->
        </div>
        ';

        return response()->json(['output' => $output]);
    }

    // download mastering data excel
    public function downloadDataMastering()
    {
        return Excel::download(new ExportMastering, 'mastering-data-aset.xlsx');
    }
    // download template data aset
    public function downloadTemplateData()
    {
        $filePath = public_path("dist/template_data_aset.xlsx");
        return response()->download($filePath);
    }

    public function getDatAset(Request $request)
    {
        $idp = $request->input('idp');
        $detail = DataAset::where('id', $idp)->first();
        $response = array(
            'status' => TRUE,
            'lat_lng' => $detail->koor_lat.','.$detail->koor_lng,
            'jenis_aset' => $detail->jenis->jenis_aset,
            'kode_jenis_aset' => $detail->jenis->kode_jenis_aset,
            'satuan_aset' => $detail->satuan->satuan_aset,
            'status_aset' => $detail->status->status_aset,
            'unit_kerja' => $detail->unitkerja->unit_kerja,
            'nama' => $detail->nama,
            'kode' => $detail->kode,
            'type' => $detail->type,
            'no_registrasi' => $detail->no_registrasi,
            'tahun_pengadaan' => $detail->tahun_pengadaan,
            'hargapengadaan' => number_format($detail->harga_pengadaan, 0 , '' , '.' ),
            'hargasekarang' => number_format($detail->harga_sekarang, 0 , '' , '.' ),
            'volume' => $detail->volume,
            'jumlah' => $detail->jumlah,
            'lokasi' => $detail->lokasi,
            'spesifikasi' => $detail->spesifikasi,
        );

        return response()->json($response);
    }

    public function LoadFirstWidget()
    {
        $jenis_count = JenisAset::all()->count();
        $aset_count = DataAset::all()->count();
        $nilai_aset_sum = DataAset::all()->sum('harga_sekarang');
        $nilai_aset = number_format($nilai_aset_sum, 0, ',', '.');
        
        $output = '
            <div class="col-lg-4">
            <a href="">
                <div class="card card-custom bg-success bgi-no-repeat card-stretch gutter-b shadow" style="background-position: right top; background-size: 40% auto; background-image: url('. asset('dist/img/jenis-aset.svg').')">
                    <!--begin::Body-->
                    <div class="card-body">
                        <span class="card-title text-light fs-1 mb-0 mt-6 d-block">'.$jenis_count.'</span>
                        <span class="card-title text-dark fs-3 fw-bolder">Data Jenis Aset</span>
                    </div>
                    <!--end::Body-->
                </div>
            </a>
        </div>
        <div class="col-lg-4">
            <a href="">
                <div class="card card-custom bg-warning bgi-no-repeat card-stretch gutter-b shadow" style="background-position: right top; background-size: 40% auto; background-image: url('.asset('dist/img/data-aset.svg').')">
                    <!--begin::Body-->
                    <div class="card-body">
                        <span class="card-title text-light fs-1 mb-0 mt-6 d-block">'.$aset_count.'</span>
                        <span class="card-title text-dark fs-3 fw-bolder">Data Aset</span>
                    </div>
                    <!--end::Body-->
                </div>
            </a>
        </div>
        <div class="col-lg-4">
            <a href="">
                <div class="card card-custom bg-primary bgi-no-repeat card-stretch gutter-b shadow" style="background-position: right top; background-size: 50% auto; background-image: url('.asset('dist/img/nilai-aset.svg').')">
                    <!--begin::Body-->
                    <div class="card-body">
                        <span class="card-title text-light fs-1 mb-0 mt-6 d-block">'.$nilai_aset.'</span>
                        <span class="card-title text-dark fs-3 fw-bolder">Total Nilai Aset	(Rp)</span>
                    </div>
                    <!--end::Body-->
                </div>
            </a>
        </div>
        ';
        $response = array(
            'status' => TRUE,
            'output' => $output
        ); 
        return response()->json($response);
    }

    public function trendPengadaan(Request $request)
    {
        $isset_tahun = DataAset::groupBy('tahun_pengadaan')->get(['tahun_pengadaan']);
        // data tahun
        foreach($isset_tahun as $tahun){
            $dataTahun[] = $tahun->tahun_pengadaan;
        }
        // counting by tahun pengadaan
        foreach($isset_tahun as $tahun){
            $countData[] = DataAset::where('tahun_pengadaan', $tahun->tahun_pengadaan)->count();
        }
        if(count($isset_tahun) <= 0){
            $dataTahun = [];
            $countData = [];
        }
        $response = array(
            'dataTahun' => $dataTahun,
            'countData' => $countData,
        );
        return response()->json($response);
    }

    public function trendPendataan(Request $request)
    {
        $dateYear = date('Y');
        $xavisBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        for ($i=1; $i<=12; $i++) { 
            $amountData[] = DataAset::whereYear('created_at', $dateYear)->whereMonth('created_at', $i)->count();
        }
        $response = array(
            'xavisBulan' => $xavisBulan,
            'amountData' => $amountData,
        );
        return response()->json($response);
    }
}
