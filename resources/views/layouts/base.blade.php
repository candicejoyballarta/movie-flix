<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Movie-Flix</title>

    {{--  CSS  --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
</head>

<body>
    @include('layouts.navbar')
    <div class="container mt-4"></div>
    <div class="row justify-content-center">
        <div class="col-md-2">
            <div class="nav flex-column nav-pills me-3" id="sideNav" role="tablist" aria-orientation="vertical">
                <a class="nav-link link active" id="v-pills-movie-tab" data-bs-toggle="pill" href="#" role="tab"
                    aria-controls="v-pills-movie" aria-selected="true" data-id="movie">Movie</a>
                <a class="nav-link link" id="v-pills-actor-tab" data-bs-toggle="pill" href="#" role="tab"
                    aria-controls="v-pills-actor" aria-selected="false" data-id="actor">Actor</a>
                <a class="nav-link link" id="v-pills-producer-tab" data-bs-toggle="pill" href="#" role="tab"
                    aria-controls="v-pills-producer" aria-selected="false" data-id="producer">Producer</a>
                <a class="nav-link link" id="v-pills-genre-tab" data-bs-toggle="pill" href="#" role="tab"
                    aria-controls="v-pills-genre" aria-selected="false" data-id="genre">Genre</a>
                <a class="nav-link link" id="v-pills-role-tab" data-bs-toggle="pill" href="#" role="tab"
                    aria-controls="v-pills-role" aria-selected="false" data-id="role">Role</a>
            </div>
        </div>
        <div class="col-md-8">
            <div class="tab-content" id="v-pills-tabContent">
                @yield('body')
            </div>
        </div>
    </div>

    {{--  Scripts  --}}
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.js"
        integrity="sha512-K3MtzSFJk6kgiFxCXXQKH6BbyBrTkTDf7E6kFh3xBZ2QNMtb6cU/RstENgQkdSLkAZeH/zAtzkxJOTTd8BqpHQ=="
        crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous">
    </script>
    <script src="https://kit.fontawesome.com/e3b47b1b85.js" crossorigin="anonymous"></script>

    {{--  <script type="module" src='{{ URL::asset('js/constants.js') }}'></script> --}}
    <script type='text/javascript' src='{{ URL::asset('js/main.js') }}'></script>
    <script type="module" src="{{ URL::asset('js/constants.js') }}"></script>

</body>

</html>
