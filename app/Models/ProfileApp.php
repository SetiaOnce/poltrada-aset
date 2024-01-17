<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileApp extends Model
{
    public $table = 'aset_profile_app';

    protected $guarded = [];
    
    use HasFactory;
}
