<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth', ['except' => ['index','getActorAll', 'getActor']]);
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Actor::all();
    }

    public function getActorAll(){
        //if ($request->ajax()){

        $actor = Actor::orderBy('created_at', 'DESC')->get();
        return response()->json($actor);

        //}
    }

    public function getActor(Request $request, $id)
    {
        $actor = Actor::where('actor_id', $id)->first();
        return response()->json($actor);
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
        $actor = Actor::create($request->all());
        return response()->json($actor);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function show(Actor $actor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $actor = Actor::find($id);
        return response()->json($actor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->ajax()) {
            $actor = Actor::find($id);
            $actors = $actor->update($request->all());
            return response()->json($actors);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $actor = Actor::findOrFail($id);
        $actor->delete();
        return response()->json(['data'=>$actor, 'status'=>200]);
    }
}
