<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = ['role_name', 'movie_id', 'actor_id'];
    protected $primaryKey = 'role_id';

    public function actors()
    {
        return $this->belongsTo(Actor::class, 'actor_id');
    }

    public function movies()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
}
