<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/movies/show/{id}',[MovieController::class, 'getmovie'] );
Route::get('/movie/all',[MovieController::class, 'getmovieall'] );
Route::get('/actor/all',[ActorController::class, 'getActorAll'] );
Route::get('/producer/all',[ProducerController::class, 'getProducerAll'] );
Route::get('/genre/all',[GenreController::class, 'getGenreAll'] );
Route::get('/role/all',[RoleController::class, 'getRoleAll'] );

Route::resource('movie', MovieController::class);
Route::resource('producer', ProducerController::class);
Route::resource('genre', GenreController::class);
Route::resource('role', RoleController::class);
Route::resource('actor', ActorController::class);
