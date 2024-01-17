<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\DataAset;
use App\Models\JenisAset;
use App\Models\StatusAset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class PenghapusanAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        $data['header_title'] = 'PENGHAPUSAN ASET';
        return view('backend.penghapusan_aset', $data);
    }
    public function data(Request $request)
    {
        $nupawal = DataAset::orderBy('kode', 'ASC')->first()->kode;
        $nupakhir = DataAset::orderBy('kode', 'DESC')->first()->kode;
        if($request->nup_awal){
            $nupawal = $request->nup_awal;
        }if($request->nup_akhir){
            $nupakhir = $request->nup_akhir;
        }
        $query = DataAset::orderBy('id', 'DESC')->whereBetween('kode', [$nupawal, $nupakhir])->whereStatus(1);
        if($request->idp_jenis){
            $query = DataAset::select('aset_data.*')
            ->join('aset_master_jenis', 'aset_master_jenis.id', '=', 'aset_data.fid_jenis')
            ->whereBetween('aset_data.kode', [$nupawal, $nupakhir])
            ->where('aset_master_jenis.id', $request->idp_jenis);
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
                $jenis = JenisAset::where('id', $row->fid_jenis)->first();
                $countJenis = DataAset::whereFidJenis($row->fid_jenis)->count();
                $output = '<span class="font-weight-bolder"><i class="bi bi-'.$jenis->icon.' icon-md bs-icon text-dark me-2"></i> '.$jenis->kode_jenis_aset.' - '.$jenis->jenis_aset.' ('.$countJenis.')</span>';
                return $output;
            })
            ->editColumn('status', function($row){
                $status = StatusAset::where('id', $row->fid_status)->first();
                $output = '<span class="badge badge-secondary"><i class="bi bi-'.$status->icon.' text-light bs-icon me-1"></i> '.$status->status_aset.'</span>';   
                if ($status->id == 1) {
                    $output = '<span class="badge badge-success"><i class="bi bi-'.$status->icon.' text-light bs-icon me-1"></i> '.$status->status_aset.'</span>'; 
                }if ($status->id == 2) {
                    $output = '<span class="badge badge-warning"><i class="bi bi-'.$status->icon.' text-light bs-icon me-1"></i> '.$status->status_aset.'</span>';
                }if ($status->id == 3) {
                    $output = '<span class="badge badge-danger"><i class="bi bi-'.$status->icon.' text-light bs-icon me-1"></i> '.$status->status_aset.'</span>';
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
                $btnAction = '<button type="button" class="btn btn-sm btn-icon btn-danger mb-1 ms-1" data-bs-toggle="tooltip" title="Hapus data aset!" onclick="_deleteAset('."'".$row->id."'".');"><i class="bi bi-trash"></i></button>';
                return $btnAction;
            })
            ->rawColumns(['action', 'status', 'thumbnail', 'jenis_aset'])
            ->make(true);
    }
    public function deleteData(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");
        DataAset::whereId($request->idp_aset)->update([
            'status' => 0,
            'user_updated' => session()->get('nama'),
            'updated_at' => Carbon::now()
        ]);
        return response()->json(['status' => TRUE]);
    }
}
