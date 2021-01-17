<?php

namespace App\Listener;

use App\Events\AuthCreated;
use App\Models\AuthLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateLogEntry
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AuthCreated  $event
     * @return void
     */
    public function handle(AuthCreated $event)
    {
        $user = $event->user;
        $log_entry = new AuthLog();
        $log_entry->name = $user->name;
        $log_entry->save();
    }
}
