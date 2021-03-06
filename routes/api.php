<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LoginController;
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

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [LoginController::class, 'register'])->name('register');


Route::middleware(['auth:sanctum'])->group(function () {
// Route::middleware(['api'])->group(function () {

    Route::post('/movie/search', [MovieController::class, 'getMovie']);
    Route::get('/movie/all',[MovieController::class, 'getMovieAll']);
    Route::resource('movie', MovieController::class);

    Route::get('/actor/all',[ActorController::class, 'getActorAll']);
    Route::resource('actor', ActorController::class);

    Route::post('/producer/search', [ProducerController::class, 'getProducer']);
    Route::get('/producer/all',[ProducerController::class, 'getProducerAll']);
    Route::resource('producer', ProducerController::class);

    Route::get('/genre/all',[GenreController::class, 'getGenreAll']);
    Route::resource('genre', GenreController::class);

    Route::get('/role/all',[RoleController::class, 'getRoleAll']);
    Route::resource('role', RoleController::class);

    Route::post('/logout', [LoginController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/mlogout', function () {
        return request()->user()->currentAccessToken()->delete();
    });

});

Route::post('/mlogin', [LoginController::class, 'mLogin']);
Route::post('/mregister', [LoginController::class, 'mRegister']);









