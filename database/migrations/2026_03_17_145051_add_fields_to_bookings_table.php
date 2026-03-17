<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
            $table->decimal('price', 8, 2)->nullable()->after('service_id');

            $table->text('notes')->nullable()->after('price');

            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();

            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();

            $table->text('cancel_reason')->nullable();

            $table->enum('payment_status', [
                'pending',
                'paid',
                'failed',
                'refunded'
            ])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
        $table->dropColumn([
                'price',
                'notes',
                'lat',
                'lng',
                'accepted_at',
                'cancelled_at',
                'cancel_reason',
                'payment_status'
            ]);
        });
    }
};
