<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\StatusAset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class MasterStatusAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        $data['header_title'] = 'STATUS ASET';
        return view('backend.status_aset', $data);
    }

    public function data(Request $request)
    {
        $data = StatusAset::orderBy('id', 'DESC')->get();
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
            'status_aset' => 'required|max:50',
            'icon' => 'required|max:60',
        ],[
            'status_aset.required' => 'Status aset tidak boleh kosong.',
            'status_aset.max' => 'Status aset tidak lebih dari 50 karakter.',
            'icon.required' => 'Icon tidak boleh kosong.',
            'icon.max' => 'Icon tidak lebih dari 60 karakter.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            StatusAset::create([
                'status_aset' => $request->input('status_aset'),
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
        $dataJenis = StatusAset::where('id', $data_id)->first();
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
            'status_aset' => 'required|max:50',
            'icon' => 'required|max:60',
        ],[
            'status_aset.required' => 'Status aset tidak boleh kosong.',
            'status_aset.max' => 'Status aset tidak lebih dari 50 karakter.',
            'icon.required' => 'Icon tidak boleh kosong.',
            'icon.max' => 'Icon tidak lebih dari 60 karakter.',
        ]);
        
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            StatusAset::where('id', $data_id)->update([
                'status_aset' => $request->input('status_aset'),
                'icon' => $request->input('icon'),
                'user_updated' => session()->get('nama'),
                'updated_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }

        return response()->json($output);
    }
}
