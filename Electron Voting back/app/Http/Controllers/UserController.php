<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signup (Request $request) {
        // $request->validate([

        // ])        

        $save_user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($save_user) {
            $login_token = auth()->claims(['name' => $save_user->name, 'email' => $save_user->email]) ->login($save_user);
            return $this->respondWithToken($login_token, 201);
        }else{
            return response()->json(["msg" => "An unknown errored, please try again"], 500);
        }

    }

    public function login (Request $request) {
        // $request->validate([

        // ])    
        
        $credentials = request(['email', 'password']);

        if (auth()->attempt($credentials)) {
            $user = User::where('email', $request->email)->first();
            $login_token = auth()->claims(['name' => $user->name, 'email' => $user->email]) ->login($user);
            return $this->respondWithToken($login_token);
        }else{
            return response()->json(["msg" => "An unknown errored, please try again"], 500);
        }

    }

    protected function respondWithToken($token, $status=200)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 120
        ], $status);
    }
}
