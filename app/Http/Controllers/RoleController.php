<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoleController extends Controller
{

    protected $rules = [
        'role_name' => 'required|max:45',
        'movie_id' => 'required',
        'actor_id' => 'required'
    ];

    protected $messages = [
        'role_name.required' => 'First name required',
        'role_name.max' => 'Only 45 char long',
        'movie_id.required' => 'Movie required',
        'actor_id.required' => 'Actor required'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return response()->json([
            'roles' => Role::with(['movies', 'actors'])->orderBy('created_at', 'DESC')->get()
        ], 200);

    }

    public function getRoleAll(Request $request)
    {
        return Role::orderBy('created_at', 'DESC')->get();
    }

    public function getRole(Request $request, $id)
    {
        $role = Role::where('role_id', $id)->first();
        return response()->json($role);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validData = $request->validate($this->rules);

        $role = Role::create($validData);

        Log::info('Role CREATED: ', ['role_id' => $role->role_id, 'role_name' => $role->role_name]);

        return response()->json([
            'msg' => 'Role Created'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::find($id);
        return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role  $role)
    {
        $validData = $request->validate($this->rules);

        $role->update($validData);

        Log::notice('Producer UPDATED: ', ['role_id' => $role->role_id, 'role_name' => $role->role_name]);

        return response()->json([
            'msg' => 'Role Updated'
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role  $role)
    {
        $role->delete();

        Log::warning('Role DELETED: ', ['role_id' => $role->role_id, 'role_name' => $role->role_name]);

        return response()->json(['msg' => 'Role Deleted'], 200);
    }
}
