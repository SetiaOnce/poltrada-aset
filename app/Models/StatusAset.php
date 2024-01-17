<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusAset extends Model
{
    public $table = 'aset_master_status';

    protected $guarded = [];
    
    use HasFactory;
}
