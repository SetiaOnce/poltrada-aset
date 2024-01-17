<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisAset extends Model
{
    public $table = 'aset_master_jenis';

    protected $guarded = [];
    
    use HasFactory;
}
