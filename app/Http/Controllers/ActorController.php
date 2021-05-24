<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ActorController extends Controller
{

    protected $rules = [
        'fname' => 'required|max:16',
        'lname' => 'required|max:16',
        'notes' => 'required|min:3|max:50',
    ];

    protected $messages = [
        'fname.required' => 'First name required',
        'fname.max' => 'Only 16 char long',
        'lname.required' => 'Last name required',
        'lname.max' => 'Only 16 char long',
        'notes.required' => 'Actor notes required',
        'notes.min' => 'note should at least be 3 char long',
        'notes.max' => 'Only 50 char long',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return response()->json([
            'actors' => Actor::with(['roles.movies'])->orderBy('created_at', 'DESC')->get()
        ], 200);

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
        $validData = $request->validate($this->rules);

        $actor = new Actor;
        $actor->fname = $validData['fname'];
        $actor->lname = $validData['lname'];
        $actor->notes = $validData['notes'];
        $actor->actor_image = 'storage/images/'.$validData['fname'].time().'.jpg';
        $actor->save();


        Storage::put('public/images/'.$validData['fname'].time().'.jpg', base64_decode($request->actor_image));

        Log::info('Actor CREATED: ', ['actor_id' => $actor->actor_id, 'actor_fname' => $actor->fname]);

        return response()->json([
            'msg' => 'Actor Created'
        ], 201);

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
    public function update(Request $request, Actor  $actor)
    {
        $validData = $request->validate($this->rules);



        $actor->fname = $validData['fname'];
        $actor->lname = $validData['lname'];
        $actor->notes = $validData['notes'];
        $actor->actor_image = 'storage/images/'.$validData['fname'].time().'.jpg';
        $actor->save();


        Storage::put('public/images/'.$validData['fname'].time().'.jpg', base64_decode($request->actor_image));

        Log::info('Actor UPDATED: ', ['actor_id' => $actor->actor_id, 'actor_fname' => $actor->fname]);

        return response()->json([
            'msg' => 'Actor Updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actor  $actor)
    {
        $actor->delete();

        Log::warning('Actor DELETED: ', ['actor_id' => $actor->actor_id, 'actor_fname' => $actor->fname]);

        return response()->json([
            'msg' => 'Actor Deleted'
        ], 200);
    }
}
