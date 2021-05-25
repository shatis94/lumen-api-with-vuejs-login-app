<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    //
    public function index(){

        if( auth()->check() ){
            $user = auth()->user();
            $response = [
                'user'=>[
                    'id'=>$user->id,
                    'name'=>$user->name,
                    'email'=>$user->email,
                    'role'=>$user->role
                ],
                'token'=>[
                    'type'=>'Bearer',
                    'value'=> auth()->tokenById($user->id),
                    'expires_at'=> auth()->factory()->getTTL(),
                ]
            ];
            return response()->json(['user'=>$response, 'error'=>false]);
        }
        return response()->json(['user'=>[], 'error'=>true,'message'=>'Un-authenticated']);
    }

    public function register(Request $request){

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message'=>'Successfully added.']);
  
    }
}
