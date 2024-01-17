<?php

namespace App\Http\Controllers\Backend;

use App\Helpers\Shortcut;
use App\Http\Controllers\Controller;
use App\Imports\ImportDataAset;
use App\Models\CekDataAset;
use App\Models\DataAset;
use App\Models\FileAset;
use App\Models\JenisAset;
use App\Models\SatuanAset;
use App\Models\StatusAset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Maatwebsite\Excel\Facades\Excel;
use Yajra\DataTables\Facades\DataTables;

class DataAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        $data['header_title'] = 'DATA ASET';
        return view('backend.data_aset', $data);
    }
    
    // =====>> FOR DATA ASET <<===== //
    public function dataAset(Request $request)
    {
        $query = DataAset::select(
                'aset_master_jenis.kode_jenis_aset',
                'aset_master_jenis.jenis_aset',
                'aset_master_jenis.icon',
                'aset_master_status.status_aset',
                'aset_master_status.id as id_status_aset',
                'aset_master_status.icon as icon_status',
                'aset_data.id',
                'aset_data.fid_jenis',
                'aset_data.fid_status',
                'aset_data.fid_unit_kerja',
                'aset_data.kode',
                'aset_data.nama',
                'aset_data.type',
                'aset_data.tahun_pengadaan',
                'aset_data.harga_pengadaan',
                'aset_data.harga_sekarang',
                'aset_data.no_registrasi',
                'aset_data.thumbnail'
            )
            ->join('aset_master_jenis', 'aset_data.fid_jenis', '=', 'aset_master_jenis.id')
            ->join('aset_master_status', 'aset_data.fid_status', '=', 'aset_master_status.id')
            ->orderBy('aset_data.fid_jenis','ASC');

        if($request->idp_jenis){
            $query = $query->where('aset_master_jenis.id', $request->idp_jenis);
        }if(!empty($request->idp_status)){
            $query = $query->where('aset_master_status.id', $request->idp_status);
        }if(!empty($request->idp_status) AND !empty($request->idp_jenis)){
            $query = $query->where('aset_master_jenis.id', $request->idp_jenis)->where('aset_master_status.id', $request->idp_status);
        }
        $data = $query->get();
        return Datatables::of($data)->addIndexColumn()
            ->editColumn('thumbnail', function ($row) {
                $file_image = $row->thumbnail;
                if($file_image==''){
                    $url_file = asset('dist/img/default-placeholder.png');
                } else {
                    if (!file_exists(public_path(). '/dist/img/data-aset/'.$file_image)){
                        $url_file = asset('dist/img/default-placeholder.png');
                        $file_image = NULL;
                    }else{
                        $url_file = url('dist/img/data-aset/'.$file_image);
                    }
                }
                $fileCustom = '<a class="d-block overlay w-100 image-popup" href="'.$url_file.'" title="'.$file_image.'">
                    <img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />
                    <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                        <span class="badge badge-dark"><i class="bi bi-eye fs-3 text-light"></i></span>
                    </div>    
                </a>';
                return $fileCustom;
            })
            ->editColumn('jenis_aset', function($row){
                $countJenis = DataAset::whereFidJenis($row->fid_jenis)->count();
                $output = '<span class="font-weight-bolder"><i class="bi bi-'.$row->icon_jenis.' icon-md bs-icon text-dark me-2"></i> '.$row->kode_jenis_aset.' - '.$row->jenis_aset.' ('.$countJenis.')</span>';
                return $output;
            })
            ->editColumn('status', function($row){
                $output = '<span class="badge badge-secondary"><i class="bi bi-'.$row->icon_status.' text-light bs-icon me-1"></i> '.$row->status_aset.'</span>';   
                if ($row->id_status_aset == 1) {
                    $output = '<span class="badge badge-success"><i class="bi bi-'.$row->icon_status.' text-light bs-icon me-1"></i> '.$row->status_aset.'</span>'; 
                }if ($row->id_status_aset == 2) {
                    $output = '<span class="badge badge-warning"><i class="bi bi-'.$row->icon_status.' text-light bs-icon me-1"></i> '.$row->status_aset.'</span>';
                }if ($row->id_status_aset == 3) {
                    $output = '<span class="badge badge-danger"><i class="bi bi-'.$row->icon_status.' text-light bs-icon me-1"></i> '.$row->status_aset.'</span>';
                }
                return $output;
            })
            ->editColumn('harga_pengadaan', function($row){
                return number_format($row->harga_pengadaan, 0, ',', '.');
            })
            ->editColumn('harga_sekarang', function($row){
                return number_format($row->harga_sekarang, 0, ',', '.');
            })
            ->addColumn('action', function($row){
                $btnDetail = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-info mb-1 ms-1" data-bs-toggle="tooltip" title="Lihat Detail Data!" onclick="_detail_aset('."'".$row->id."'".');"><i class="bi bi-eye-fill fs-3"></i></button>';
                $btnKelolaFile = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-primary mb-1 ms-1" data-bs-toggle="tooltip" title="Lihat Detail Data!" onclick="_kelolaFile('."'".$row->id."'".');"><i class="bi bi-file-earmark-text-fill fs-3"></i></button>';
                $btnEdit = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-warning mb-1 ms-1" data-bs-toggle="tooltip" title="Edit data!" onclick="_edit_aset('."'".$row->id."'".');"><i class="la la-edit fs-3"></i></button>';
                return $btnDetail.$btnKelolaFile.$btnEdit;
            })
            ->rawColumns(['action', 'status', 'thumbnail', 'jenis_aset'])
            ->make(true);
    }
    
    public function getHeaderAset(Request $request)
    {
        $idp = $request->input('group');
        $jenis = JenisAset::where('id', 1)->first();
        // $output =  '<span class="font-weight-bolder"><i class="bi bi-'.$jenis->icon.' icon-md bs-icon text-dark"></i> '.$jenis->kode_jenis_aset.' - '.$jenis->jenis_aset.' (20)</span>';
        $output =  '<i class="bi bi-'.$jenis->icon.' me-2"></i>'.$jenis->kode_jenis_aset.' - '.$jenis->jenis_aset;
        return response()->json($output);
    }
    
    public function ImportDataExcel(Request $request)
    {
        if($request->ajax()){   
            try {
                $file = $request->file('file_excel');
                $nama_file = Shortcut::random_strings(20).$file->getClientOriginalName();
                $file->move('dist/excel/', $nama_file);

                Excel::import(new ImportDataAset, public_path('/dist/excel/'.$nama_file));        
                return response()->json([
                    'status'    => TRUE,
                ]);
            } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
                $failures = $e->failures();
                foreach($failures as $failure)
                {
                    return response()->json([
                        'status'    => 422,
                        'errors'    => $failure->errors(),
                    ]);
                }
            }  
        }
    }
    
    public function saveDataAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");
        $errors					= [];
        $validator = Validator::make($request->all(), [
            'fid_jenis' => 'required',
            'kode_aset' => 'required|unique:aset_data,kode',
            'nama_aset' => 'required',
            'fid_unit_kerja' => 'required',
            'no_registrasi' => 'required|unique:aset_data,no_registrasi',
            'volume_aset' => 'required',
            'jumlah_aset' => 'required',
            'fid_satuan' => 'required',
            'tipe_aset' => 'required',
            'lokasi_aset' => 'required',
            'tahun_pengadaan' => 'required',
            'harga_pengadaan' => 'required',
            'harga_sekarang' => 'required',
            'thumbnail' => 'required|mimes:png,jpg,jpeg|max:2048',
            'spesifikasi_aset' => 'required',
            'fid_status' => 'required',
        ],[
            'fid_jenis.required' => 'Jenis aset masih kosong.',
            'kode_aset.required' => 'NUP aset masih kosong.',
            'kode_aset.unique' => 'Gagal melakukan proses data, Data Aset dengan NUP yang sama sudah tersedia pada sistem!.',
            'nama_aset.required' => 'Nama aset masih kosong.',
            'fid_unit_kerja.required' => 'Unit kerja masih kosong.',
            'no_registrasi.required' => 'No regestrasi masih kosong.',
            'no_registrasi.unique' => 'Gagal melakukan proses data, Data Aset dengan no regestrasi yang sama sudah tersedia pada sistem!.',
            'volume_aset.required' => 'Volume masih kosong.',
            'jumlah_aset.required' => 'Jumlah masih kosong.',
            'fid_satuan.required' => 'Satuan aset masih kosong.',
            'tipe_aset.required' => 'Tipe aset masih kosong.',
            'lokasi_aset.required' => 'Lokasi aset masih kosong.',
            'tahun_pengadaan.required' => 'Tahun pengadaan aset masih kosong.',
            'harga_pengadaan.required' => 'Harga pengadaan aset masih kosong.',
            'harga_sekarang.required' => 'Harga sekarang masih kosong.',
            'thumbnail.required' => 'Thumnail masih kosong.',
            'thumbnail.max' => 'Thumnail tidak lebih dari 2MB.',
            'thumbnail.mimes' => 'Thumnail berekstensi jpg jepg png.',
            'spesifikasi_aset.required' => 'Spesifikasi aset masih kosong.',
            'fid_status.required' => 'Status aset masih kosong.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            $mainImage = $request->file('thumbnail');
            $filename = Shortcut::random_strings(20) . '-thumnail.' . $mainImage->extension();
            Image::make($mainImage)->save(public_path('dist/img/data-aset/'.$filename));
            
            $save = DataAset::create([
                'fid_jenis' => $request->input('fid_jenis'),
                'fid_status' => $request->input('fid_status'),
                'fid_unit_kerja' => $request->input('fid_unit_kerja'),
                'kode' => $request->input('kode_aset'),
                'nama' => $request->input('nama_aset'),
                'type' => $request->input('tipe_aset'),
                'tahun_pengadaan' => $request->input('tahun_pengadaan'),
                'volume' => $request->input('volume_aset'),
                'no_registrasi' => $request->input('no_registrasi'),
                'spesifikasi' => $request->input('spesifikasi_aset'),
                'harga_pengadaan' => str_replace('.', '', $request->input('harga_pengadaan')),
                'harga_sekarang' => str_replace('.', '', $request->input('harga_sekarang')),
                'lokasi' => $request->input('lokasi_aset'),
                'koor_lat' => $request->input('koord_lat'),
                'koor_lng' => $request->input('koord_lng'),
                'jumlah' => $request->input('jumlah_aset'),
                'fid_satuan' => $request->input('fid_satuan'),
                'thumbnail' => $filename,
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);

            $output = array(
                "status" => TRUE,
                'idp_aset' => $save->id,
                'kode_aset' => $save->kode,
            );
        }

        return response()->json($output);
    }
    
    public function editAset(Request $request)
    {
        $data_id = $request->input('idp');
        $detail = DataAset::where('id', $data_id)->first();

        $response = array(
            'status' => TRUE,
            'id' => $detail->id,
            'lat_lng' => $detail->koor_lat.','.$detail->koor_lng,
            'fid_jenis' => $detail->fid_jenis,
            'fid_satuan' => $detail->fid_satuan,
            'fid_status' => $detail->fid_status,
            'fid_unit_kerja' => $detail->fid_unit_kerja,
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
            'urlThumbnail' => asset('dist/img/data-aset/'.$detail->thumbnail),
        );
        return response()->json($response);
    }
    
    public function updateAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");
        $errors					= [];
        $validator = Validator::make($request->all(), [
            'fid_jenis' => 'required',
            'kode_aset' => 'required',
            'nama_aset' => 'required',
            'fid_unit_kerja' => 'required',
            'no_registrasi' => 'required',
            'volume_aset' => 'required',
            'jumlah_aset' => 'required',
            'fid_satuan' => 'required',
            'tipe_aset' => 'required',
            'lokasi_aset' => 'required',
            'tahun_pengadaan' => 'required',
            'harga_pengadaan' => 'required',
            'harga_sekarang' => 'required',
            'spesifikasi_aset' => 'required',
            'fid_status' => 'required',
        ],[
            'fid_jenis.required' => 'Jenis aset masih kosong.',
            'kode_aset.required' => 'NUP aset masih kosong.',
            'nama_aset.required' => 'Nama aset masih kosong.',
            'fid_unit_kerja.required' => 'Unit kerja masih kosong.',
            'no_registrasi.required' => 'No regestrasi masih kosong.',
            'volume_aset.required' => 'Volume masih kosong.',
            'jumlah_aset.required' => 'Jumlah masih kosong.',
            'fid_satuan.required' => 'Satuan aset masih kosong.',
            'tipe_aset.required' => 'Tipe aset masih kosong.',
            'lokasi_aset.required' => 'Lokasi aset masih kosong.',
            'tahun_pengadaan.required' => 'Tahun pengadaan aset masih kosong.',
            'harga_pengadaan.required' => 'Harga pengadaan aset masih kosong.',
            'harga_sekarang.required' => 'Harga sekarang masih kosong.',
            'spesifikasi_aset.required' => 'Spesifikasi aset masih kosong.',
            'fid_status.required' => 'Status aset masih kosong.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            if($request->file('thumbnail')){
                $validator = Validator::make($request->all(), [
                    'thumbnail' => 'required|mimes:png,jpg,jpeg|max:2048',
                ],[
                    'thumbnail.required' => 'Thumnail masih kosong.',
                    'thumbnail.max' => 'Thumnail tidak lebih dari 2MB.',
                    'thumbnail.mimes' => 'Thumnail berekstensi jpg jepg png.',
                ]);
            
                if($validator->fails()){
                    foreach ($validator->errors()->getMessages() as $item) {
                        $errors[] = $item;
                    }
                    $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
                } else {
                    $mainImage = $request->file('thumbnail');
                    $filename = Shortcut::random_strings(20) . '-thumnail.' . $mainImage->extension();
                    Image::make($mainImage)->save(public_path('dist/img/data-aset/'.$filename));
    
                    $save = DataAset::where('id', $request->input('id'))->update([
                        'thumbnail' => $filename,
                    ]);
                }
            }

            $save = DataAset::where('id', $request->input('id'))->update([
                'fid_jenis' => $request->input('fid_jenis'),
                'fid_status' => $request->input('fid_status'),
                'fid_unit_kerja' => $request->input('fid_unit_kerja'),
                'kode' => $request->input('kode_aset'),
                'nama' => $request->input('nama_aset'),
                'type' => $request->input('tipe_aset'),
                'tahun_pengadaan' => $request->input('tahun_pengadaan'),
                'volume' => $request->input('volume_aset'),
                'no_registrasi' => $request->input('no_registrasi'),
                'spesifikasi' => $request->input('spesifikasi_aset'),
                'harga_pengadaan' => str_replace('.', '', $request->input('harga_pengadaan')),
                'harga_sekarang' => str_replace('.', '', $request->input('harga_sekarang')),
                'lokasi' => $request->input('lokasi_aset'),
                'koor_lat' => $request->input('koord_lat'),
                'koor_lng' => $request->input('koord_lng'),
                'jumlah' => $request->input('jumlah_aset'),
                'fid_satuan' => $request->input('fid_satuan'),
                'user_updated' => session()->get('nama'),
                'updated_at' => Carbon::now()
            ]);

            $output = array(
                "status" => TRUE,
                'idp_aset' => $request->input('id'),
                'kode_aset' => $request->input('kode_aset'),
            );
        }

        return response()->json($output);
    }

    public function detailAset(Request $request)
    {
        $idp = $request->input('idp');
        $detail = dataAset::where('id', $idp)->first();
        $response = array(
            'status' => TRUE,
            'lat_lng' => $detail->koor_lat.','.$detail->koor_lng,
            'jenis_aset' => $detail->jenis->jenis_aset,
            'satuan_aset' => $detail->satuan->satuan_aset,
            'status_aset' => StatusAset::whereId($detail->fid_status)->first()->status_aset,
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

    // =====>> FOR FILE ASET <<===== //
    public function dataFileAset(Request $request)
    {
        $data = FileAset::orderBy('id', 'DESC')->where('fid_aset', $request->input('idp_aset'))->get();

        return Datatables::of($data)->addIndexColumn()
            ->editColumn('nama', function($row){
                return '<strong>'. $row->nama_file .'</strong>';
            })
            ->editColumn('file', function ($row) {
                if($row->file_type == 'IMAGE'){
                    $file_image = $row->file;
                    if($file_image==''){
                        $url_file = asset('dist/img/default-placeholder.png');
                    } else {
                        if (!file_exists(public_path(). '/dist/img/file-aset/'.$file_image)){
                            $url_file = asset('dist/img/default-placeholder.png');
                            $file_image = NULL;
                        }else{
                            $url_file = url('dist/img/file-aset/'.$file_image);
                        }
                    }
                    $fileCustom = '<img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />';
                }else{
                    $fileCustom = '<a href="'.asset('dist/img/file-aset/'.$row->file).'" class="btn btn-sm btn-dark" target="_blank"><i class="bi bi-eye fs-3 text-light"></i> Lihat File</a>';
                }
                return $fileCustom;
            })
            ->addColumn('action', function($row) use($request){
                $btnDelete = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-danger mb-1 ms-1" data-bs-toggle="tooltip" title="Hapus data!" onclick="_hapus_fileaset('."'".$row->id."'".');"><i class="las la-trash-alt fs-3"></i></button>';
                if($request->input('mode_show')=='detail'){
                    $btnDelete = '';
                }
                return $btnDelete;
            })
            ->rawColumns(['action', 'nama', 'file'])
            ->make(true);
    }
    public function saveFileAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");
        $errors					= [];
        $validator = Validator::make($request->all(), [
            'namafile_aset' => 'required',
            'file_aset' => 'required|mimes:jpg,jpeg,png,pdf|max:10048',
        ],[
            'namafile_aset.required' => 'Nama file aset masih kosong.',
            'file_aset.required' => 'File Aset masih kosong.',
            'file_aset.max' => 'File Aset tidak lebih dari 10MB.',
            'file_aset.mimes' => 'File Aset berekstensi jpg jepg png pdf.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            $mainImage = $request->file('file_aset');
            $filename = Shortcut::random_strings(30) . '.' . $mainImage->getClientOriginalExtension();
            if($mainImage->getClientOriginalExtension() == 'jpg' || $mainImage->extension() == 'jpeg' || $mainImage->extension() == 'png'){
                $mainImage->move(public_path('dist/img/file-aset/'), $filename);
                $type_file = 'IMAGE';
            }else{
                $mainImage->move(public_path('dist/img/file-aset/'), $filename);
                $type_file = 'FILE';
            }
            
            FileAset::create([
                'fid_aset' => $request->input('id_aset'),
                'nama_file' => $request->input('namafile_aset'),
                'file_type' => $type_file,
                'file' => $filename,
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);

            $output = array(
                "status" => TRUE,
                ''
            );
        }

        return response()->json($output);
    }
    public function deleteFileAset(Request $request)
    {
        $data_id = $request->input('idp');
        FileAset::where('id', $data_id)->delete();
        return response()->json([
            'status' => TRUE
        ]);
    }
    
    // ====>> FOR ADING NEW MASTERISASI  <<==== //
    public function addJenisAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'kode_jenis_aset' => 'required|max:255|unique:aset_master_jenis,kode_jenis_aset,',
            'jenis_aset' => 'required|max:255',
            'deskjenis_aset' => 'required|max:255',
            'iconjenis_aset' => 'required|max:120',
        ],[
            'kode_jenis_aset.required' => 'Kode jenis aset tidak boleh kosong.',
            'kode_jenis_aset.max' => 'Kode jenis aset lebih dari 255 karakter.',
            'kode_jenis_aset.unique' => 'Kode jenis aset sudah terdata pada sistem, masukkan kode lain.',
            'jenis_aset.required' => 'Jenis aset tidak boleh kosong.',
            'jenis_aset.max' => 'Jenis aset lebih dari 255 karakter.',
            'deskjenis_aset.required' => 'Deskripsi tidak boleh kosong.',
            'deskjenis_aset.max' => 'Deskripsi tidak lebih dari 255 karakter.',
            'iconjenis_aset.required' => 'Icon tidak boleh kosong.',
            'iconjenis_aset.max' => 'Icon lebih dari 55 karakter.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            JenisAset::create([
                'kode_jenis_aset' => $request->input('kode_jenis_aset'),
                'jenis_aset' => $request->input('jenis_aset'),
                'deskripsi' => $request->input('deskjenis_aset'),
                'icon' => $request->input('iconjenis_aset'),
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }

    public function addSatuanAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'satuan_aset' => 'required|max:60',
        ],[
            'satuan_aset.required' => 'Satuan tidak boleh kosong.',
            'satuan_aset.max' => 'Satuan tidak lebih dari 60 karakter.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            SatuanAset::create([
                'satuan_aset' => $request->input('satuan_aset'),
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }

    public function addStatusAset(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'status_aset' => 'required|max:50',
            'iconstatus_aset' => 'required|max:60',
        ],[
            'status_aset.required' => 'Status aset tidak boleh kosong.',
            'status_aset.max' => 'Status aset tidak lebih dari 50 karakter.',
            'iconstatus_aset.required' => 'Icon tidak boleh kosong.',
            'iconstatus_aset.max' => 'Icon tidak lebih dari 60 karakter.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            StatusAset::create([
                'status_aset' => $request->input('status_aset'),
                'icon' => $request->input('iconstatus_aset'),
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }

    public function loadPerawatan(Request $request)
    {
        $data = CekDataAset::orderBy('id', 'DESC')->where('jenis_cek_data_aset', 2)->where('fid_data_aset', $request->input('idp_aset'))->get();

        return Datatables::of($data)->addIndexColumn()
        ->editColumn('tanggal', function($row){
            return Shortcut::tanggal($row->tanggal);
        })
        ->editColumn('keterangan', function($row){
            return $row->keterangan;
        })
        ->addColumn('image', function ($row) {
            $file_image = $row->foto_kegiatan;
            if($file_image==''){
                $url_file = asset('dist/img/default-placeholder.png');
            } else {
                if (!file_exists(public_path(). '/dist/img/perawatan/'.$file_image)){
                    $url_file = asset('dist/img/default-placeholder.png');
                    $file_image = NULL;
                }else{
                    $url_file = url('dist/img/perawatan/'.$file_image);
                }
            }
            $fileCustom = '<img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />';
            return $fileCustom;
        })
        ->rawColumns(['tanggal', 'keterangan', 'image'])
        ->make(true);
    }
    public function loadPemeriksaan(Request $request)
    {
        $data = CekDataAset::orderBy('id', 'DESC')->where('jenis_cek_data_aset', 1)->where('fid_data_aset', $request->input('idp_aset'))->get();

        return Datatables::of($data)->addIndexColumn()
        ->editColumn('tanggal', function($row){
            return Shortcut::tanggal($row->tanggal);
        })
        ->editColumn('keterangan', function($row){
            return $row->keterangan;
        })
        ->addColumn('image', function ($row) {
            $file_image = $row->foto_kegiatan;
            if($file_image==''){
                $url_file = asset('dist/img/default-placeholder.png');
            } else {
                if (!file_exists(public_path(). '/dist/img/pemeriksaan/'.$file_image)){
                    $url_file = asset('dist/img/default-placeholder.png');
                    $file_image = NULL;
                }else{
                    $url_file = url('dist/img/pemeriksaan/'.$file_image);
                }
            }
            $fileCustom = '<img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />';
            return $fileCustom;
        })
        ->rawColumns(['tanggal', 'keterangan', 'image'])
        ->make(true);
    }
}
