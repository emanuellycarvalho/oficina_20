<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'client',
        'description',
        'value',
        'seller_id'
    ];

    public function seller(){
        return $this->belongsTo(Seller::class);
    }
}
