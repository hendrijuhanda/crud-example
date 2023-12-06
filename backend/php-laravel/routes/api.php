<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Todo\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'todo'], function () {
    Route::get('/', [TodoController::class, 'index'])->name('todo.index');
    Route::post('/', [TodoController::class, 'store'])->name('todo.store');
    Route::get('/{id}', [TodoController::class, 'show'])->name('todo.show');
    Route::put('/{id}', [TodoController::class, 'update'])->name('todo.update');
    Route::delete('/{id}', [TodoController::class, 'destroy'])->name('todo.delete');
});
