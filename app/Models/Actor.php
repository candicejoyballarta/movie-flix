<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Actor extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['fname', 'lname', 'notes'];
    protected $primaryKey = 'actor_id';

    public function roles()
    {
        return $this->hasMany(Role::class, 'role_id', 'actor_id');
    }
}
