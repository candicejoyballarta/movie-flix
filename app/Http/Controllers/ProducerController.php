<?php

namespace App\Http\Controllers;

use App\Models\Producer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProducerController extends Controller
{

    protected $rules = [
        'fname' => 'required|max:16',
        'lname' => 'required|max:16',
        'company' => 'required|max:45',
    ];

    protected $messages = [
        'fname.required' => 'First name required',
        'fname.max' => 'Only 16 char long',
        'lname.required' => 'Last name required',
        'lname.max' => 'Only 16 char long',
        'company.required' => 'Company required',
        'company.max' => 'Only 45 char long'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return response()->json([
            'producers' => Producer::with(['movies'])->orderBy('created_at', 'DESC')->get()
        ], 200);

    }

    public function getProducerAll(Request $request)
    {
        return Producer::orderby('created_at', 'DESC')->get();
    }

    public function getProducer(Request $request, $name)
    {
        $producer = Producer::where('fname', $name)->first();
        return response()->json([
            'producer' => $producer
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

        $producer = Producer::create($validData);

        Log::info('Producer CREATED: ', ['producer_id' => $producer->producer_id, 'producer_fname' => $producer->fname]);

        return response()->json([
            'msg' => 'Producer Created'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function show(Producer $producer)
    {
        $producer = Producer::where('producer_id', $producer)->first();
        return response()->json($producer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $producer = Producer::find($id);
        return response()->json($producer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producer $producer)
    {
        $validData = $request->validate($this->rules);

        $producer->update($validData);

        Log::notice('Producer UPDATED: ', ['producer_id' => $producer->producer_id, 'producer_fname' => $producer->fname]);

        return response()->json([
            'msg' => 'Producer updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producer $producer)
    {
        $producer->delete();


        Log::warning('Producer DELETED: ', ['producer_id' => $producer->producer_id, 'producer_fname' => $producer->fname]);


        return response()->json(['msg' => 'Producer DELETED'], 200);
    }
}
