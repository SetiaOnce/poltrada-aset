<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CekDataAset extends Model
{
    public $table = 'aset_cek_data_aset';

    protected $guarded = [];
    
    use HasFactory;

    public function aset()
    {
    	return $this->belongsTo('App\Models\DataAset', 'fid_data_aset', 'id'); 
    } 
}
