<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    use HasFactory;
    protected $fillable = ['fname', 'lname', 'company'];
    protected $primaryKey = 'producer_id';

    public function movies()
    {
        return $this->hasMany(Movie::class, 'movie_id');
    }
}
