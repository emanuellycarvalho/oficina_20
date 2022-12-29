<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'active'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at'
    ];

    protected $appends = ['budgetAmount'];

    public function budgets(){
        return $this->hasMany(Budget::class);
    }

    protected function getBudgetAmountAttribute()
    {
        return $this->budgets()->count();
    }
}
