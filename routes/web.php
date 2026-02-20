<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\adminController;
use App\Http\Controllers\Provider\providerController;
use App\Http\Controllers\ServiceController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::prefix('admin')->group(function () {
    Route::get('/dashboard',[adminController::class, 'index'])->name('admin.dashboard');
    Route::get('/index',[ServiceController::class, 'index'])->name('admin.service.index');
    Route::get('/create',[ServiceController::class,'create'])->name('admin.service.create');
    Route::post('/store',[ServiceController::class,'store'])->name('admin.service.stores');
    Route::get('/{service}/edit', [ServiceController::class, 'edit'])->name('admin.service.edit');
    Route::put('/service/{service}', [ServiceController::class, 'update'])->name('admin.service.update');
    /*    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
     */

});

Route::prefix('provider')->group(function () {
    Route::get('/dashboard',[providerController::class, 'index'])->name('provider.dashboard');
});
require __DIR__.'/settings.php';
