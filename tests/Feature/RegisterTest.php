<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function register_new_user()
    {
        $response = $this->post('/api/mregister', [
            'name' => 'Example Name',
            'email' => 'testing@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'device_name' => 'iphone'
        ]);

        $response->assertSuccessful();
        $this->assertNotEmpty($response->getContent());
        $this->assertDatabaseHas('users', ['email' => 'testing@gmail.com']);
        $this->assertDatabaseHas('personal_access_tokens', ['name' => 'iphone']);

    }

}
