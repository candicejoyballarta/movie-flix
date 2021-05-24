<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GenreController extends Controller
{
    protected $rules = [
        'genre_name' => 'required|min:3|max:20'
    ];

    protected $messages = [
        'genre_name.required' => 'Genre name required',
        'genre_name.min' => 'Name should at least be 3 char long',
        'genre_name.max' => 'Only 45 char long'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $genre = Genre::with(['movies'])->orderBy('created_at', 'DESC')->get();
        // return response()->json($genre);
        return response()->json([
            'genres' => Genre::with(['movies'])->orderBy('created_at', 'DESC')->get(),
        ], 200);
    }

    public function getGenreAll()
    {
        //if ($request->ajax()){
            $genre = Genre::with(['movies'])->orderBy('created_at', 'DESC')->get();
            return response()->json($genre);
        //}
    }

    public function getGenre(Request $request, $genre)
    {
        $genre = Genre::where('genre_name', $genre)->first();
        return response()->json($genre);
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

        $genre = Genre::create($validData);

        Log::info('Genre CREATED: ', ['genre_id' => $genre->genre_id, 'genre_name' => $genre->genre_name]);

        return response()->json(["msg" => "Genre created"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function show(Genre $genre)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $genre = Genre::find($id);
        return response()->json($genre);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Genre $genre)
    {
        $validData = $request->validate($this->rules);

        $genre->update($validData);

        Log::notice('Genre UPDATED: ', ['genre_id' => $genre->genre_id, 'genre_name' => $genre->genre_name]);

        return response()->json([
            "msg" => "Genre Updated"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();


        Log::warning('Genre DELETED: ', [
            'genre_id' => $genre->genre_id, 'genre_name' => $genre->genre_name
        ]);


        return response()->json([
            'msg'=> 'Genre Deleted'
        ], 200);
    }
}
