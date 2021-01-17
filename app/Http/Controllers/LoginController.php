<?php

namespace App\Http\Controllers;

use App\Events\AuthCreated;
use App\Models\User;
use Exception;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password'=> bcrypt($request['password'])
        ]);


        AuthCreated::dispatch($user);
        //Event::fire(new AuthCreated($user));

        return response()->json($user);
    }

    public function login(Request $request){

        try {

            $credentials = request(['email', 'password']);

            if(!Auth::attempt($credentials)){
                return response()->json([
                    'status' => 500,
                    'message' => 'Unauthorized'
                ]);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new \Exception('Error in Login');
            }


            $tokenResult = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'user' => auth()->user(),
                'message' => 'success',
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
            ]);


        } catch (Exception $error) {
            return response()->json([
                'status_code' => 500,
                'error' => $error,
            ]);
        }
    }

    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete();
        //Auth::guard('web')->logout();

        //Auth::user()->tokens()->where('id', $id)->delete();
        //Auth::guard('web')->logout();

        return response()->json([
            'status_code' => 200,
            'message' => 'user logged out'
        ]);

    }


}
