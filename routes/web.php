<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\adminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Provider\providerController;
use App\Http\Controllers\Provider\ServicePController;

use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
//user
use App\Http\Controllers\User\ServiceUController;
use App\Http\Controllers\User\ProviderUController;
use App\Http\Controllers\User\BookingUController;
use App\Http\Controllers\User\DashboardUController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::middleware(['auth','verified'])->group(function (){
    Route::get('dashboard', [DashboardUController::class, 'Dashboard'])->name('dashboard');
    //Route::get('dashboard', function () {return Inertia::render('dashboard');})->name('dashboard');
    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/services', [ServiceUController::class, 'index'])->name('services');
        Route::get('/services/{service}/providers', [ProviderUController::class, 'index'])->name('providers');
        Route::post('/createBooking', [BookingUController::class, 'create'])->name('createBooking');

        Route::post('/booking', [BookingUController::class, 'store'])->name('store');
        Route::get('/my-bookings', [BookingUController::class, 'myBookings'])->name('bookings');
        Route::post('/{booking}/cancel', [BookingUController::class, 'cancel'])->name('cancel');
        

    });

    //Route::get('/services', [ServiceUController::class, 'index'])->name('services');
    
});


Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard',[adminController::class, 'index'])->name('dashboard');
    
    /* ===== Services ===== */
    Route::prefix('service')->name('service.')->group(function () {
        Route::get('/', [ServiceController::class, 'index'])->name('index');
        Route::get('/create', [ServiceController::class, 'create'])->name('create');
        Route::post('/', [ServiceController::class, 'store'])->name('store');
        Route::get('/{service}/edit', [ServiceController::class, 'edit'])->name('edit');
        Route::put('/{service}', [ServiceController::class, 'update'])->name('update');
        Route::delete('/{service}', [ServiceController::class, 'destroy'])->name('destroy');
    });
    /* ===== Users ===== */
    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::get('/store', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        
    });
     Route::prefix('booking')->name('booking.')->group(function () {
        Route::get('/', [BookingController::class, 'index'])->name('booking');
        Route::get('/create', [BookingController::class, 'create'])->name('create');
        Route::get('/store', [BookingController::class, 'store'])->name('store');
        Route::get('/{booking}/edit', [BookingController::class, 'edit'])->name('edit');
        Route::put('/{booking}', [BookingController::class, 'update'])->name('update');
        Route::delete('/{booking}', [BookingController::class, 'destroy'])->name('destroy');
        Route::post('/{booking}/accept', [BookingController::class, 'accept'])->name('accept');
        Route::post('/{booking}/cancel', [BookingController::class, 'cancel'])->name('cancel');
        Route::post('/{booking}/complete', [BookingController::class, 'complete'])->name('complete');
   
    });
    
})->middleware(['auth', 'verified']);

Route::prefix('provider')->name('provider.')->group(function () {
    Route::get('/dashboard',[providerController::class, 'index'])->name('dashboard');
    Route::get('/create', [ServicePController::class, 'create'])->name('create');
    Route::post('/', [ServicePController::class, 'store'])->name('store');
    Route::get('/service', [ServicePController::class, 'service'])->name('service');

     

})->middleware(['auth', 'verified']);
require __DIR__.'/settings.php';
 