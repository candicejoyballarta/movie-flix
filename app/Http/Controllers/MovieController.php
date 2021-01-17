<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{

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
        return Movie::all();
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
        $movie = Movie::create($request->all());

        foreach ($request->genre_id as $genre_id) {
            DB::insert('insert into genre_movie (genre_id, movie_id) values (?, ?)', [$genre_id, $movie->movie_id]);
        }

        return response()->json($movie);
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
    public function update(Request $request, $id)
    {
        //if ($request->ajax()) {
            $movie = Movie::find($id)->update($request->all());
            return response()->json($movie);
        //}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();
        return response()->json(['success'=>"movie deleted successfully",'data'=>$movie,'status'=>200]);
    }
}
