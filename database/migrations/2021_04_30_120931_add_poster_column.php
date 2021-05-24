<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPosterColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('actors', function (Blueprint $table){
            $table->string('actor_image');
        });

        Schema::table('movies', function (Blueprint $table){
            $table->string('movie_image');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('actors', function (Blueprint $table){
            $table->string('actor_image');
        });

        Schema::table('movies', function (Blueprint $table){
            $table->string('movie_image');
        });
    }
}
