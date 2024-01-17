<?php

namespace App\Http\Controllers;

use App\Models\DataAset;
use App\Models\JenisAset;
use App\Models\SatuanAset;
use App\Models\StatusAset;
use App\Models\UnitKerja;
use Illuminate\Http\Request;

class SelectController extends Controller
{
    public function jenisAset()
    {
        $query = JenisAset::orderBy('jenis_aset', 'ASC')->get();
        return response()->json($query);
    }
    public function statusAset()
    {
        $query = StatusAset::orderBy('status_aset', 'ASC')->get();
        return response()->json($query);
    }
    public function unitKerja()
    {
        $query = UnitKerja::orderBy('unit_kerja', 'ASC')->where('status', 1)->get();
        return response()->json($query);
    }
    public function satuanAset()
    {
        $query = SatuanAset::orderBy('satuan_aset', 'ASC')->get();
        return response()->json($query);
    }
    public function dataAset()
    {
        $asetData = DataAset::select('id', 'kode', 'nama', 'no_registrasi')
                        ->when(request()->get('term'), function ($query, $search) {
                            return $query->where('nama','like','%'.@$search.'%');
                        })
                        ->get();

        $query = [];
        foreach($asetData as $row){
            $query[] =[
                'id' => $row->id,
                'text' => $row->kode.' - '.$row->nama. '( ' . $row->no_registrasi .' )'
            ];
        }
        
        return response()->json($query);
    }
}
