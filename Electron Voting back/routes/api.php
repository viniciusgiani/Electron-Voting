<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/user/save', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);

Route::get('/candidates', [GeneralController::class, 'get_candidates'])->middleware('auth:api');
Route::post('/candidates/vote', [GeneralController::class, 'vote_candidates']);

Route::get('/votes', [GeneralController::class, 'get_votes'])->middleware('auth:api');
