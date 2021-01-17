<?php

namespace App\Listener;

use App\Events\AuthCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use App\Models\User;

class SendWelcomeEmail
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
        Mail::to($event->user)->send(new WelcomeEmail($event->user));
    }
}
