<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function logout_user()
    {
        $user = User::create([
            'name' => 'Example',
            'email' => 'example@gmail.com',
            'password' => bcrypt('password')
        ]);

        $token = $user->createToken('iphone')->plainTextToken;

        $response = $this->post('/api/mlogout', [], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertSuccessful();
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

}
