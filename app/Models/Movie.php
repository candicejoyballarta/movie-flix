<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title','plot','year', 'producer_id'];
    protected $primaryKey = 'movie_id';

    public function producers()
    {
        return $this->belongsTo(Producer::class, 'producer_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_movie', 'movie_id', 'genre_id')->withTimestamps();
    }

    public function roles()
    {
        return $this->hasMany(Role::class, 'movie_id');
    }
}
