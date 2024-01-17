<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAset extends Model
{
    public $table = 'aset_data';

    protected $guarded = [];
    
    use HasFactory;

    public function jenis()
    {
    	return $this->belongsTo('App\Models\JenisAset', 'fid_jenis', 'id'); 
    } 
    public function satuan()
    {
    	return $this->belongsTo('App\Models\SatuanAset', 'fid_satuan', 'id'); 
    } 
    public function status()
    {
    	return $this->belongsTo('App\Models\StatusAset', 'fid_status', 'id'); 
    } 
    public function unitkerja()
    {
    	return $this->belongsTo('App\Models\UnitKerja', 'fid_unit_kerja', 'id'); 
    } 
}
