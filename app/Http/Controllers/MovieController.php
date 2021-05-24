<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{

    protected $rules = [
        'title' => 'required|min:3|max:45',
        'plot' => 'required|min:3|max:350',
        'year' => 'required|min:4|numeric',
        'producer_id' => 'required'
    ];

    protected $messages = [
        'title.required' => 'Movie title required',
        'title.min' => 'Name should at least be 3 char long',
        'title.max' => 'Only 45 char long',
        'plot.required' => 'Movie title required',
        'plot.min' => 'Plot should at least be 3 char long',
        'plot.max' => 'Only 350 char long',
        'year.required' => 'year required',
        'year.numeric' => 'must be numeric',
        'year.min' => 'must be a valid year',
        'movie_image.image' => 'must upload valid movie poster',
        'producer_id.required' => 'Producer required',
    ];

    public function getMovieAll(){
        //if ($request->ajax()){
            $movies = Movie::orderBy('created_at', 'DESC')->get();
            return response()->json($movies);
        //}
    }

    public function getMovie(Request $request){
        $search = $request->search;
        if($search == ''){
            $movies = Movie::orderBy('title', 'ASC')->select('movie_id', 'title')->limit(5)->get();
        }else{
            $movies = Movie::orderBy('title', 'ASC')->select('movie_id', 'title')->where('title', 'LIKE', '%'.$search.'%')->limit(5)->get();
        }

        $response = array();
        foreach ($movies as $movie) {
            $response[] = array("value"=>$movie->movie_id,"label"=>$movie->title);
        }

        return response()->json($response);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'movies' => Movie::with(['producers', 'genres', 'roles.actors'])->orderBy('created_at')->get()
        ], 200);

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

        $movie = new Movie;
        $movie->title = $validData['title'];
        $movie->plot = $validData['plot'];
        $movie->year = $validData['year'];
        $movie->movie_image = 'storage/images/'.$validData['title'].time().'.jpg';
        $movie->producers()->associate($validData['producer_id']);
        $movie->save();

        foreach ($request->genre_id as $genre_id) {
            DB::insert('insert into genre_movie (genre_id, movie_id) values (?, ?)', [$genre_id, $movie->movie_id]);
        }

        foreach ($request->actor_id as $actor_id) {
            DB::insert('insert into roles (actor_id, movie_id) values (?, ?)', [$actor_id, $movie->movie_id]);
        }

        Storage::put('public/images/'.$validData['title'].time().'.jpg', base64_decode($request['movie_image']));

        Log::info('Movie CREATED: ', ['movie_id' => $movie->movie_id, 'title' => $movie->title]);

        return response()->json([
            'msg' => 'Movie Created'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $movies = Movie::with('Producers')
        ->where('movies.movie_id', '=', $id)
        ->get();

        return response()->json($movies);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $movie = Movie::with('genres')->find($id);
        return response()->json($movie);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {

        $validData = $request->validate($this->rules);
        $genre_ids = $request->genre_id;
        $actor_ids = $request->actor_id;

        if(empty($genre_ids)){
            DB::table('genre_movie')->where('movie_id',$movie->movie_id)->delete();
        } else {
            foreach($genre_ids as $genre_id) {
                DB::table('genre_movie')->where('movie_id',$movie->movie_id)->delete();
            }
            foreach($genre_ids as $genre_id) {
                DB::table('genre_movie')->insert(['genre_id' => $genre_id, 'movie_id' => $movie->movie_id]);
            }
        }

        if(empty($actor_ids)){
            DB::table('roles')->where('movie_id',$movie->movie_id)->delete();
        } else {
            foreach($actor_ids as $actor_id) {
                DB::table('roles')->where(['movie_id' => $movie->movie_id, 'actor_id' => $actor_id])->delete();
            }
            foreach($actor_ids as $actor_id) {
                DB::table('roles')->insert(['actor_id' => $actor_id, 'movie_id' => $movie->movie_id]);
            }
        }

        $movie->title = $validData['title'];
        $movie->plot = $validData['plot'];
        $movie->year = $validData['year'];
        $movie->producer_id = $validData['producer_id'];
        if($request->movie_image != ""){
            $movie->movie_image = 'storage/images/'.$validData['title'].time().'.jpg';
            Storage::put('public/images/'.$validData['title'].time().'.jpg', base64_decode($request->movie_image));
        }
        $movie->save();



        Log::notice('Movie UPDATE: ', ['movie_id' => $movie->movie_id, 'title' => $movie->title]);

        return response()->json([
            "msg" => "Movie Updated"
        ], 200);
        //}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        Log::warning('Movie DELETED: ', [
            'movie_id' => $movie->movie_id, 'title' => $movie->title
        ]);

        return response()->json([
            'msg'=>"Movie Deleted"
        ], 202);
    }
}
