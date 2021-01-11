// import { modals } from './constants';

$('.link').on('click', (e) => {
    const link = e.currentTarget.dataset.id;
    $.ajax({
        type: 'GET',
        url: `/api/${link}/all`,
        success(response) {
            let template = '';
            switch (link) {
                case 'movie':
                    template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createMovieModal">
                            Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Plot</th>
                                        <th>Year</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="movieTableBody">

                                </tbody>
                            </table>
                        </div>
                    </div>`;
                    $('#content').html(template);
                    response.forEach((element) => {
                        $('#movieTableBody').append(`
                            <tr>
                                <td>${element.movie_id}</td>
                                <td>${element.title}</td>
                                <td>${element.plot}</td>
                                <td>${element.year}</td>
                                <td align='center'>
                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editMovieModal' id='editbtn' data-id="${element.movie_id}"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                                    </a></i>
                                </td>
                                <td align='center'>
                                    <a href='#' id='movieDeleteBtn' data-id="${element.movie_id}"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                                </td>
                            </tr>
                        `);
                    });
                    $('#content').append(modals.movie);

                    $('#createMovieModal').on('show.bs.modal', function (e) {
                        $.ajax({
                            type: 'GET',
                            url: '/api/genre/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#genres').append(`
                                        <input type="checkbox" class="form-check-input" id="genre_id" name="genre_id[]" value="${element.genre_id}">
                                        <label class="form-check-label" for="genre_id">${element.genre_name}</label>
                                    `);
                                });
                            },
                        });
                    });

                    $('#createMovieModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        //console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/producer/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#producer_id').append(`
                                        <option value="${element.producer_id}">${element.fname} ${element.lname}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#createMovieModal').on('hidden.bs.modal', function (e) {
                        $('#cform').trigger('reset');
                        $('#producer_id').empty();
                        $('#genres').empty();
                    });

                    $('#createMovieSubmit').on('click', function (e) {
                        e.preventDefault();
                        var data = $('#cform').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: '/api/movie',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                $('#createMovieModal').each(function () {
                                    $(this).modal('hide');
                                });
                                var tr = $('<tr>');
                                tr.append($('<td>').html(data.movie_id));
                                tr.append($('<td>').html(data.title));
                                tr.append($('<td>').html(data.plot));
                                tr.append($('<td>').html(data.year));
                                $('#movieTableBody').prepend(tr);
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#editMovieModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/producer/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#movieProd').append(`
                                        <option value="${element.producer_id}">${element.fname} ${element.lname}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#editMovieModal').on('show.bs.modal', function (e) {
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/genre/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#genres').append(`
                                        <input type="checkbox" class="form-check-input" id="genre_id" name="genre_id[]" value="${element.genre_id}">
                                        <label class="form-check-label" for="genre_id">${element.genre_name}</label>
                                    `);
                                });
                            },
                        });
                    });

                    $('#editMovieModal').on('show.bs.modal', function (e) {
                        var id = $(e.relatedTarget).attr('data-id');
                        console.log(id);
                        $('<input>')
                            .attr({
                                type: 'hidden',
                                id: 'movie_id',
                                name: 'movie_id',
                                value: id,
                            })
                            .appendTo('#movieUpdateForm');
                        $.ajax({
                            type: 'GET',
                            url: '/api/movie/' + id + '/edit',
                            success: function (data) {
                                console.log(data);
                                $('#movieTitle').val(data.title);
                                $('#moviePlot').val(data.plot);
                                $('#movieYear').val(data.year);
                                $('#movieProd').val(data.producer_id);
                                // $.each(data, function() {
                                //     $('#genre_id').val(data.genre_id);
                                // });
                            },
                            error: function () {
                                console.log('AJAX load did not work');
                                alert('error');
                            },
                        });
                    });

                    $('#editMovieModal').on('hidden.bs.modal', function (e) {
                        $('#movieUpdateForm').trigger('reset');
                        $('#movieProd').empty();
                        $('#genre_id').empty();
                    });

                    $('#updateMovieBtn').on('click', function (e) {
                        e.preventDefault();
                        var id = $('#movie_id').val();
                        var data = $('#movieUpdateForm').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'PUT',
                            url: '/api/movie/' + id,
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                $('#editMovieModal').each(function () {
                                    $(this).modal('hide');
                                });
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#movieTableBody').on(
                        'click',
                        '#movieDeleteBtn',
                        function (e) {
                            var id = $(this).data('id');
                            var $tr = $(this).closest('tr');
                            console.log(id);
                            e.preventDefault();
                            bootbox.confirm({
                                message:
                                    'Are you sure you want to delete this movie?',
                                buttons: {
                                    confirm: {
                                        label: 'yes',
                                        className: 'btn-success',
                                    },
                                    cancel: {
                                        label: 'no',
                                        className: 'btn-danger',
                                    },
                                },
                                callback: function (result) {
                                    if (result)
                                        $.ajax({
                                            type: 'DELETE',
                                            url: '/api/movie/' + id,
                                            headers: {
                                                'X-CSRF-TOKEN': $(
                                                    'meta[name="csrf-token"]'
                                                ).attr('content'),
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                console.log(data);
                                                // bootbox.alert('success');
                                                $tr.find('td').fadeOut(
                                                    2000,
                                                    function () {
                                                        $tr.remove();
                                                    }
                                                );
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            },
                                        });
                                },
                            });
                        }
                    );

                    break;

                case 'actor':
                    template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createActorModal">
                            Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Notes</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="actorTableBody">

                                </tbody>
                            </table>
                        </div>
                    </div>`;
                    $('#content').html(template);
                    response.forEach((element) => {
                        $('#actorTableBody').append(`
                            <tr>
                                <td>${element.actor_id}</td>
                                <td>${element.fname}</td>
                                <td>${element.lname}</td>
                                <td>${element.notes}</td>
                                <td align='center'>
                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editActorModal' id='actorEditBtn' data-id="${element.actor_id}"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                                    </a></i>
                                </td>
                                <td align='center'>
                                    <a href='#' id='actorDeleteBtn' data-id="${element.actor_id}"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                                </td>
                            </tr>
                        `);
                    });
                    $('#content').append(modals.actor);

                    $('#createActorSubmit').on('click', function (e) {
                        e.preventDefault();
                        var data = $('#cform').serialize();
                        //console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: '/api/actor',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                $('#createActorModal').each(function () {
                                    $(this).modal('hide');
                                });
                                var tr = $('<tr>');
                                tr.append($('<td>').html(data.actor_id));
                                tr.append($('<td>').html(data.fname));
                                tr.append($('<td>').html(data.lname));
                                tr.append($('<td>').html(data.notes));
                                tr.append(
                                    "<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editActorModal' id='actorEditBtn' data-id=" +
                                        data.actor_id +
                                        "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>"
                                );
                                tr.append(
                                    "<td align='center'><a href='#' id='actorDeleteBtn' data-id=" +
                                        data.actor_id +
                                        "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>"
                                );
                                $('#actorTableBody').prepend(tr);
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#editActorModal').on('show.bs.modal', function (e) {
                        var id = $(e.relatedTarget).attr('data-id');
                        console.log(id);
                        $('<input>')
                            .attr({
                                type: 'hidden',
                                id: 'actor_id',
                                name: 'actor_id',
                                value: id,
                            })
                            .appendTo('#actorUpdateForm');
                        $.ajax({
                            type: 'GET',
                            url: '/api/actor/' + id + '/edit',
                            success: function (data) {
                                $('#actorFname').val(data.fname);
                                $('#actorLname').val(data.lname);
                                $('#actorNotes').val(data.notes);
                            },
                            error: function () {
                                console.log('AJAX load did not work');
                                alert('error');
                            },
                        });
                    });

                    $('#updateActorBtn').on('click', function (e) {
                        e.preventDefault();
                        var id = $('#actor_id').val();
                        var data = $('#actorUpdateForm').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'PUT',
                            url: '/api/actor/' + id,
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                $('#editActorModal').each(function () {
                                    $(this).modal('hide');
                                });
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#actorTableBody').on(
                        'click',
                        '#actorDeleteBtn',
                        function (e) {
                            var id = $(this).data('id');
                            var $tr = $(this).closest('tr');
                            console.log(id);
                            e.preventDefault();
                            bootbox.confirm({
                                message:
                                    'Are you sure you want to delete this actor?',
                                buttons: {
                                    confirm: {
                                        label: 'yes',
                                        className: 'btn-success',
                                    },
                                    cancel: {
                                        label: 'no',
                                        className: 'btn-danger',
                                    },
                                },
                                callback: function (result) {
                                    if (result)
                                        $.ajax({
                                            type: 'DELETE',
                                            url: '/api/actor/' + id,
                                            headers: {
                                                'X-CSRF-TOKEN': $(
                                                    'meta[name="csrf-token"]'
                                                ).attr('content'),
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                console.log(data);
                                                // bootbox.alert('success');
                                                $tr.find('td').fadeOut(
                                                    2000,
                                                    function () {
                                                        $tr.remove();
                                                    }
                                                );
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            },
                                        });
                                },
                            });
                        }
                    );
                    break;

                case 'producer':
                    template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createProducerModal">
                            Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Company</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="producerTableBody">

                                </tbody>
                            </table>
                        </div>
                    </div>`;
                    $('#content').html(template);
                    response.forEach((element) => {
                        $('#producerTableBody').append(`
                            <tr>
                                <td>${element.producer_id}</td>
                                <td>${element.fname}</td>
                                <td>${element.lname}</td>
                                <td>${element.company}</td>
                                <td align='center'>
                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editProducerModal' id='editbtn' data-id="${element.producer_id}"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                                    </a></i>
                                </td>
                                <td align='center'>
                                    <a href='#' id='producerDeleteBtn' data-id="${element.producer_id}"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                                </td>
                            </tr>
                        `);
                    });
                    $('#content').append(modals.producer);

                    $('#createProducerSubmit').on('click', function (e) {
                        e.preventDefault();
                        var data = $('#cform').serialize();
                        //console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: '/api/producer',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                //console.log(data);
                                // $("myModal").modal("hide");
                                $('#createProducerModal').each(function () {
                                    $(this).modal('hide');
                                });
                                // $.each(data, function(key, value){
                                var tr = $('<tr>');
                                tr.append($('<td>').html(data.producer_id));
                                tr.append($('<td>').html(data.fname));
                                tr.append($('<td>').html(data.lname));
                                tr.append($('<td>').html(data.company));
                                $('#producerTableBody').prepend(tr);
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#editProducerModal').on('show.bs.modal', function (e) {
                        var id = $(e.relatedTarget).attr('data-id');
                        console.log(id);
                        $('<input>')
                            .attr({
                                type: 'hidden',
                                id: 'producer_id',
                                name: 'producer_id',
                                value: id,
                            })
                            .appendTo('#producerUpdateForm');
                        $.ajax({
                            type: 'GET',
                            url: '/api/producer/' + id + '/edit',
                            success: function (data) {
                                $('#producerFname').val(data.fname);
                                $('#producerLname').val(data.lname);
                                $('#producerCompany').val(data.company);
                            },
                            error: function () {
                                console.log('AJAX load did not work');
                                alert('error');
                            },
                        });
                    });

                    $('#updateProducerBtn').on('click', function (e) {
                        e.preventDefault();
                        var id = $('#producer_id').val();
                        var data = $('#producerUpdateForm').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'PUT',
                            url: '/api/producer/' + id,
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                $('#editProducerModal').each(function () {
                                    $(this).modal('hide');
                                });
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#producerTableBody').on(
                        'click',
                        '#producerDeleteBtn',
                        function (e) {
                            var id = $(this).data('id');
                            var $tr = $(this).closest('tr');
                            console.log(id);
                            e.preventDefault();
                            bootbox.confirm({
                                message:
                                    'Are you sure you want to delete this producer?',
                                buttons: {
                                    confirm: {
                                        label: 'yes',
                                        className: 'btn-success',
                                    },
                                    cancel: {
                                        label: 'no',
                                        className: 'btn-danger',
                                    },
                                },
                                callback: function (result) {
                                    if (result)
                                        $.ajax({
                                            type: 'DELETE',
                                            url: '/api/producer/' + id,
                                            headers: {
                                                'X-CSRF-TOKEN': $(
                                                    'meta[name="csrf-token"]'
                                                ).attr('content'),
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                console.log(data);
                                                // bootbox.alert('success');
                                                $tr.find('td').fadeOut(
                                                    2000,
                                                    function () {
                                                        $tr.remove();
                                                    }
                                                );
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            },
                                        });
                                },
                            });
                        }
                    );
                    break;

                case 'genre':
                    template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createGenreModal">
                            Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Genre Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="genreTableBody">

                                </tbody>
                            </table>
                        </div>
                    </div>`;
                    $('#content').html(template);
                    response.forEach((element) => {
                        $('#genreTableBody').append(`
                            <tr>
                                <td>${element.genre_id}</td>
                                <td>${element.genre_name}</td>
                                <td align='center'>
                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editGenreModal' id='editbtn' data-id="${element.genre_id}"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                                    </a></i>
                                </td>
                                <td align='center'>
                                    <a href='#' id='genreDeleteBtn' data-id="${element.genre_id}"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                                </td>
                            </tr>
                        `);
                    });
                    $('#content').append(modals.genre);

                    $('#createGenreSubmit').on('click', function (e) {
                        e.preventDefault();
                        var data = $('#cform').serialize();
                        //console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: '/api/genre',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                $('#createGenreModal').each(function () {
                                    $(this).modal('hide');
                                });
                                var tr = $('<tr>');
                                tr.append($('<td>').html(data.genre_id));
                                tr.append($('<td>').html(data.genre_name));
                                $('#genreTableBody').prepend(tr);
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#editGenreModal').on('show.bs.modal', function (e) {
                        var id = $(e.relatedTarget).attr('data-id');
                        console.log(id);
                        $('<input>')
                            .attr({
                                type: 'hidden',
                                id: 'genre_id',
                                name: 'genre_id',
                                value: id,
                            })
                            .appendTo('#genreUpdateForm');
                        $.ajax({
                            type: 'GET',
                            url: '/api/genre/' + id + '/edit',
                            success: function (data) {
                                $('#genreName').val(data.genre_name);
                            },
                            error: function () {
                                console.log('AJAX load did not work');
                                alert('error');
                            },
                        });
                    });

                    $('#updateGenreBtn').on('click', function (e) {
                        e.preventDefault();
                        var id = $('#genre_id').val();
                        var data = $('#genreUpdateForm').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'PUT',
                            url: '/api/genre/' + id,
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                $('#editGenreModal').each(function () {
                                    $(this).modal('hide');
                                });
                            },
                            error: function (error) {
                                console.log('error');
                            },
                        });
                    });

                    $('#genreTableBody').on(
                        'click',
                        '#genreDeleteBtn',
                        function (e) {
                            var id = $(this).data('id');
                            var $tr = $(this).closest('tr');
                            console.log(id);
                            e.preventDefault();
                            bootbox.confirm({
                                message:
                                    'Are you sure you want to delete this genre?',
                                buttons: {
                                    confirm: {
                                        label: 'yes',
                                        className: 'btn-success',
                                    },
                                    cancel: {
                                        label: 'no',
                                        className: 'btn-danger',
                                    },
                                },
                                callback: function (result) {
                                    if (result)
                                        $.ajax({
                                            type: 'DELETE',
                                            url: '/api/genre/' + id,
                                            headers: {
                                                'X-CSRF-TOKEN': $(
                                                    'meta[name="csrf-token"]'
                                                ).attr('content'),
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                console.log(data);
                                                // bootbox.alert('success');
                                                $tr.find('td').fadeOut(
                                                    2000,
                                                    function () {
                                                        $tr.remove();
                                                    }
                                                );
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            },
                                        });
                                },
                            });
                        }
                    );
                    break;

                case 'role':
                    template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRoleModal">
                            Add
                        </button>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Role Name</th>
                                        <th>Movie</th>
                                        <th>Actor</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="roleTableBody">

                                </tbody>
                            </table>
                        </div>
                    </div>`;
                    $('#content').html(template);
                    response.forEach((element) => {
                        $('#roleTableBody').append(`
                            <tr>
                                <td>${element.role_id}</td>
                                <td>${element.role_name}</td>
                                <td>${element.movie_id}</td>
                                <td>${element.actor_id}</td>
                                <td align='center'>
                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editRoleModal' id='editbtn' data-id="${element.role_id}"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                                    </a></i>
                                </td>
                                <td align='center'>
                                    <a href='#' id='roleDeleteBtn' data-id="${element.role_id}"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                                </td>
                            </tr>
                        `);
                    });
                    $('#content').append(modals.role);

                    $('#createRoleModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/movie/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#movie_id').append(`
                                        <option value="${element.movie_id}">${element.title}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#createRoleModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/actor/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#actor_id').append(`
                                        <option value="${element.actor_id}">${element.fname} ${element.lname}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#createRoleSubmit').on('click', function (e) {
                        e.preventDefault();
                        var data = $('#cform').serialize();
                        //console.log(data);
                        $.ajax({
                            type: 'POST',
                            url: '/api/role',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                //console.log(data);
                                // $("myModal").modal("hide");
                                $('#createRoleModal').each(function () {
                                    $(this).modal('hide');
                                });
                                // $.each(data, function(key, value){
                                var tr = $('<tr>');
                                tr.append($('<td>').html(data.role_id));
                                tr.append($('<td>').html(data.role_name));
                                tr.append($('<td>').html(data.movie_id));
                                tr.append($('<td>').html(data.actor_id));
                                $('#roleTableBody').prepend(tr);
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#editRoleModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/movie/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#roleMovie').append(`
                                        <option value="${element.movie_id}">${element.title}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#editRoleModal').on('show.bs.modal', function (e) {
                        // Populate dropdown with producers on movie modal show
                        console.log(e);
                        $.ajax({
                            type: 'GET',
                            url: '/api/actor/all',
                            success(response) {
                                response.forEach((element) => {
                                    $('#roleActor').append(`
                                        <option value="${element.actor_id}">${element.fname} ${element.lname}</option>
                                    `);
                                });
                            },
                        });
                    });

                    $('#editRoleModal').on('show.bs.modal', function (e) {
                        var id = $(e.relatedTarget).attr('data-id');
                        console.log(id);
                        $('<input>')
                            .attr({
                                type: 'hidden',
                                id: 'role_id',
                                name: 'role_id',
                                value: id,
                            })
                            .appendTo('#roleUpdateForm');
                        $.ajax({
                            type: 'GET',
                            url: '/api/role/' + id + '/edit',
                            success: function (data) {
                                $('#roleName').val(data.role_name);
                                $('#roleMovie').val(data.movie_id);
                                $('#roleActor').val(data.actor_id);
                            },
                            error: function () {
                                console.log('AJAX load did not work');
                                alert('error');
                            },
                        });
                    });

                    $('#editRoleModal').on('hidden.bs.modal', function (e) {
                        $('#roleUpdateForm').trigger('reset');
                        $('#roleMovie').empty();
                        $('#roleActor').empty();
                    });

                    $('#updateRoleBtn').on('click', function (e) {
                        e.preventDefault();
                        var id = $('#role_id').val();
                        var data = $('#roleUpdateForm').serialize();
                        console.log(data);
                        $.ajax({
                            type: 'PUT',
                            url: '/api/role/' + id,
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $(
                                    'meta[name="csrf-token"]'
                                ).attr('content'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                $('#editRoleModal').each(function () {
                                    $(this).modal('hide');
                                });
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });

                    $('#roleTableBody').on(
                        'click',
                        '#roleDeleteBtn',
                        function (e) {
                            var id = $(this).data('id');
                            var $tr = $(this).closest('tr');
                            console.log(id);
                            e.preventDefault();
                            bootbox.confirm({
                                message:
                                    'Are you sure you want to delete this role?',
                                buttons: {
                                    confirm: {
                                        label: 'yes',
                                        className: 'btn-success',
                                    },
                                    cancel: {
                                        label: 'no',
                                        className: 'btn-danger',
                                    },
                                },
                                callback: function (result) {
                                    if (result)
                                        $.ajax({
                                            type: 'DELETE',
                                            url: '/api/role/' + id,
                                            headers: {
                                                'X-CSRF-TOKEN': $(
                                                    'meta[name="csrf-token"]'
                                                ).attr('content'),
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                console.log(data);
                                                // bootbox.alert('success');
                                                $tr.find('td').fadeOut(
                                                    2000,
                                                    function () {
                                                        $tr.remove();
                                                    }
                                                );
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            },
                                        });
                                },
                            });
                        }
                    );
                    break;

                default:
                    break;
            }
        },
    });
});

const modals = {
    movie: `<div class="modal fade" id="createMovieModal" tabindex="-1" aria-labelledby="createMovieLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new movie</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="title" class="control-label">Title</label>
                                    <input type="text" class="form-control" id="title" name="title">

                                </div>
                                <div class="form-group">
                                    <label for="plot" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="plot" name="plot"></text>

                                </div>
                                <div class="form-group">
                                    <label for="year" class="control-label">Year</label>
                                    <input type="text" class="form-control " id="year" name="year">
                                </div>
                                <div class="form-group">
                                    <label for="producer_id" class="control-label">Producer</label>
                                    <select class="form-select" aria-label="producer" id="producer_id" name="producer_id">
                                        <option value="0">- Select -</option>
                                    </select>
                                </div>
                                <div class="form-group" id="genres">
                                    <label class="control-label">Genre</label><br>

                                </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createMovieSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editMovieModal" tabindex="-1" aria-labelledby="editMovieLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update movie</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="movieUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="movieTitle" class="control-label">Title</label>
                                    <input type="text" class="form-control" id="movieTitle" name="title">
                                </div>
                                <div class="form-group">
                                    <label for="moviePlot" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="moviePlot" name="plot"></text>
                                </div>
                                <div class="form-group">
                                    <label for="movieYear" class="conrol-label">Year</label>
                                    <input type="text" class="form-control " id="movieYear" name="year">
                                </div>
                                <div class="form-group">
                                    <label for="producer_id" class="control-label">Producer</label>
                                    <select class="form-select" aria-label="producers" id="movieProd" name="producer_id">
                                    </select>
                                </div>
                                <div class="form-group" id="genres">
                                    <label class="control-label">Genre</label><br>

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateMovieBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="movie_id" name="movie_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,

    actor: `<div class="modal fade" id="createActorModal" tabindex="-1" aria-labelledby="createActorLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new actor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="fname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="lname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="notes" class="control-label">Notes</label>
                                    <input type="text" class="form-control " id="notes" name="notes">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createActorSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editActorModal" tabindex="-1" aria-labelledby="editActorLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update actor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actorUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="actorFname" class="control-label">First Name</label>
                                    <input type="text" class="form-control" id="actorFname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="actorLname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="notes" class="control-label">Year</label>
                                    <input type="text" class="form-control " id="actorNotes" name="notes">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateActorBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="actor_id" name="actor_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,

    producer: `<div class="modal fade" id="createProducerModal" tabindex="-1" aria-labelledby="createProducerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new Producer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="fname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="lname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="company" class="control-label">Company</label>
                                    <input type="text" class="form-control " id="company" name="company">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createProducerSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editProducerModal" tabindex="-1" aria-labelledby="editProducerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Producer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="producerUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="producerFname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="producerLname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="company" class="control-label">Company</label>
                                    <input type="text" class="form-control " id="producerCompany" name="company">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateProducerBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="producer_id" name="producer_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,
    genre: `<div class="modal fade" id="createGenreModal" tabindex="-1" aria-labelledby="createGenreLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Genre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="genre_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="genre_name" name="genre_name">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createGenreSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editGenreModal" tabindex="-1" aria-labelledby="editGenreLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Genre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="genreUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="genre_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="genreName" name="genre_name">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateGenreBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="genre_id" name="genre_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,
    role: `<div class="modal fade" id="createRoleModal" tabindex="-1" aria-labelledby="createRoleLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Role</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="role_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="role_name" name="role_name">
                                </div>
                                <div class="form-group">
                                    <label for="movie_id" class="control-label">Movie</label>
                                    <select class="form-select" aria-label="movies" id="movie_id" name="movie_id">
                                        <option value="0">- Select -</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="actor_id" class="control-label">Actor</label>
                                    <select class="form-select" aria-label="actors" id="actor_id" name="actor_id">
                                        <option value="0">- Select -</option>
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createRoleSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Role</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="roleUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="role_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="roleName" name="role_name">
                                </div>
                                <div class="form-group">
                                    <label for="movie_id" class="control-label">Movie</label>
                                    <select class="form-select" aria-label="movies" id="roleMovie" name="movie_id">
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="actor_id" class="control-label">Actor</label>
                                    <select class="form-select" aria-label="actors" id="roleActor" name="actor_id">
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateRoleBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="role_id" name="role_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,
};
