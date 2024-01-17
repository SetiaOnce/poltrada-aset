<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\JenisAset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class MasterJenisAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        
        $data['header_title'] = 'JENIS ASET';
        return view('backend.jenis_asets', $data);
    }

    public function data(Request $request)
    {
        $data = JenisAset::orderBy('id', 'DESC')->get();
        return Datatables::of($data)->addIndexColumn()
            ->editColumn('icon', function ($row) {
                return '<i class="bi-'.$row->icon.'"></i>';
            })
            ->addColumn('action', function($row){
                $btnEdit = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-dark mb-1 ms-1" data-bs-toggle="tooltip" title="Edit data!" onclick="_editData('."'".$row->id."'".');"><i class="la la-edit fs-3"></i></button>';
                return $btnEdit;
            })
            ->rawColumns(['icon', 'action'])
            ->make(true);
    }
    
    public function store(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'kode_jenis_aset' => 'required|max:255|unique:aset_master_jenis,kode_jenis_aset,',
            'jenis_aset' => 'required|max:255',
            'deskripsi' => 'required|max:255',
            'icon' => 'required|max:120',
        ],[
            'kode_jenis_aset.required' => 'Kode jenis aset tidak boleh kosong.',
            'kode_jenis_aset.max' => 'Kode jenis aset lebih dari 255 karakter.',
            'kode_jenis_aset.unique' => 'Kode jenis aset sudah terdata pada sistem, masukkan kode lain.',
            'jenis_aset.required' => 'Jenis aset tidak boleh kosong.',
            'jenis_aset.max' => 'Jenis aset lebih dari 255 karakter.',
            'deskripsi.required' => 'Deskripsi tidak boleh kosong.',
            'deskripsi.max' => 'Deskripsi tidak lebih dari 255 karakter.',
            'icon.required' => 'Icon tidak boleh kosong.',
            'icon.max' => 'Icon lebih dari 55 karakter.',
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
                'deskripsi' => $request->input('deskripsi'),
                'icon' => $request->input('icon'),
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }
    
    public function edit(Request $request)
    {
        $data_id = $request->input('idp');
        $dataJenis = JenisAset::where('id', $data_id)->first();
        return response()->json([
            'status' => TRUE,
            'row' =>$dataJenis,
        ]);
    }
    
    public function update(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $data_id = $request->input('id');
        $errors					= [];

        $validator = Validator::make($request->all(), [
            'kode_jenis_aset' => 'required|max:255',
            'jenis_aset' => 'required|max:255',
            'deskripsi' => 'required|max:255',
            'icon' => 'required|max:120',
        ],[
            'kode_jenis_aset.required' => 'Kode jenis aset tidak boleh kosong.',
            'kode_jenis_aset.max' => 'Kode jenis aset lebih dari 255 karakter.',
            'jenis_aset.required' => 'Jenis aset tidak boleh kosong.',
            'jenis_aset.max' => 'Jenis aset lebih dari 255 karakter.',
            'deskripsi.required' => 'Deskripsi tidak boleh kosong.',
            'deskripsi.max' => 'Deskripsi tidak lebih dari 255 karakter.',
            'icon.required' => 'Icon tidak boleh kosong.',
            'icon.max' => 'Icon lebih dari 55 karakter.',
        ]);
        
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            JenisAset::where('id', $data_id)->update([
                'kode_jenis_aset' => $request->input('kode_jenis_aset'),
                'jenis_aset' => $request->input('jenis_aset'),
                'deskripsi' => $request->input('deskripsi'),
                'icon' => $request->input('icon'),
                'user_updated' => session()->get('nama'),
                'updated_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }

        return response()->json($output);
    }
}
