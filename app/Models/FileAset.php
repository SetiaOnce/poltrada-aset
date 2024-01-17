<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileAset extends Model
{
    public $table = 'aset_source_file';

    protected $guarded = [];
    
    use HasFactory;

    public function aset()
    {
    	return $this->belongsTo('App\Models\DataAset', 'fid_aset', 'id'); 
    }  
}
