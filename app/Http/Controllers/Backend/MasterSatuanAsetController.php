<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\SatuanAset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class MasterSatuanAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        $data['header_title'] = 'SATUAN ASET';
        return view('backend.satuan_aset', $data);
    }

    public function data(Request $request)
    {
        $data = SatuanAset::orderBy('id', 'DESC')->get();
        return Datatables::of($data)->addIndexColumn()
            ->addColumn('action', function($row){
                $btnEdit = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-dark mb-1 ms-1" data-bs-toggle="tooltip" title="Edit data!" onclick="_editData('."'".$row->id."'".');"><i class="la la-edit fs-3"></i></button>';
                return $btnEdit;
            })
            ->rawColumns(['action'])
            ->make(true);
    }
    
    public function store(Request $request)
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
    
    public function edit(Request $request)
    {
        $data_id = $request->input('idp');
        $dataJenis = SatuanAset::where('id', $data_id)->first();
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
            SatuanAset::where('id', $data_id)->update([
                'satuan_aset' => $request->input('satuan_aset'),
                'user_updated' => session()->get('nama'),
                'updated_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }

        return response()->json($output);
    }
}
