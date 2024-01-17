<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SatuanAset extends Model
{
    public $table = 'aset_master_satuan';

    protected $guarded = [];
    
    use HasFactory;
}
