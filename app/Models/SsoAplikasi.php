<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SsoAplikasi extends Model
{
    public $table = 'sso_aplikasi';
    
    public $timestamps = false;
    
    protected $fillable = [
        'situs',
        'id_group_app',
        'icon_image',
    ];
    
    use HasFactory;
}
