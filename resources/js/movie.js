import movieModal from './movieModal';
const movie = {
    show(response) {
        let template = `<div class="container">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#createMovieModal">
                                    Add
                            </button>
                            <a href="" id="userLogout">Logout</a>
                            <br />
                            <div id="ctable" class="table-responsive">
                                <table class="table table-striped table-hover resizable">
                                    <thead id="cheader">
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
                        <a href='#' data-bs-toggle='modal' data-bs-target='#editMovieModal'
                            id='editbtn' data-id="${element.movie_id}">
                                <i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                        </a></i>
                    </td>
                    <td align='center'>
                        <a href='#' id='movieDeleteBtn' data-id="${element.movie_id}">
                            <i  class='fa fa-trash-o' style='font-size:24px; color:red' ></i>
                        </a>
                    </td>
                </tr>
            `);
        });

        $('#content').append(movieModal);

        $('.resizable').resizable({
            animate: true,
            start() {},
            stop() {},
        });

        var validationObj = $('#movieModalForm').validate({
            rules: {
                title: { required: true, maxlength: 45 },
                plot: { required: true, maxlength: 350 },
                year: {
                    required: true,
                    minlength: 4,
                    number: true,
                },
                producer_id: { required: true },
                genre_id: { required: true, minlength: 1 },
                action: 'required',
            },
            messages: {
                title: { required: 'Must add title' },
                plot: { required: 'Must add movie plot' },
                year: {
                    required: 'Must be a year',
                },
                producer_id: { required: 'Must select producer' },
                genre_id: { required: 'Must select genre' },
                action: 'Please provide data',
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationObj.form();

        $('#createMovieSubmit').on('click', function (e) {
            if (!validationObj.form()) {
                e.preventDefault();
            }
            var data = $('#movieModalForm').serialize();
            console.log(window.localStorage.getItem('access_token'));
            $.ajax({
                type: 'POST',
                url: '/api/movie',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token'),
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

        $('#createMovieModal').on('hidden.bs.modal', function (e) {
            console.log($('#createMovieModal'));
            $('#movieModalForm').trigger('reset');
            $('#producer_id').empty();
            $('#genres').empty();
        });

        $('#editMovieModal').on('show.bs.modal', function (e) {
            // Populate dropdown with producers on movie modal show
            console.log(e);
            $.ajax({
                type: 'GET',
                url: '/api/producer/all',
                dataType: 'json',
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success(response) {
                    response.forEach((element) => {
                        $('#movieProd').append(`
                            <option value="${element.producer_id}">${element.fname} ${element.lname}</option>
                        `);
                    });
                },
            });

            $.ajax({
                type: 'GET',
                url: '/api/genre/all',
                dataType: 'json',
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success(response) {
                    response.forEach((element) => {
                        console.log(element);
                        $('#editGenres').append(`
                            <input type="checkbox" class="form-check-input" id="genre_id${element.genre_id}" name="genre_id[]" value="${element.genre_id}">
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
                dataType: 'json',
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success: function (data) {
                    console.log(data);
                    $('#movieTitle').val(data.title);
                    $('#moviePlot').val(data.plot);
                    $('#movieYear').val(data.year);
                    $('#movieProd').val(data.producer_id);
                    data.genres.forEach((element) => {
                        $(`#genre_id${element.genre_id}`).attr('checked', true);
                    });
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
            $('#editGenres').empty();
        });

        var validationUpdate = $('#movieUpdateForm').validate({
            rules: {
                title: { required: true, maxlength: 45 },
                plot: { required: true, maxlength: 350 },
                year: {
                    required: true,
                    minlength: 4,
                    number: true,
                },
                producer_id: { required: true },
                genre_id: { required: true, minlength: 1 },
                action: 'required',
            },
            messages: {
                title: { required: 'Must add title' },
                plot: { required: 'Must add movie plot' },
                year: {
                    required: 'Must be a year',
                },
                producer_id: { required: 'Must select producer' },
                genre_id: { required: 'Must select genre' },
                action: 'Please provide data',
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationUpdate.form();

        $('#updateMovieBtn').on('click', function (e) {
            if (!validationUpdate.form()) {
                e.preventDefault();
            }
            var id = $('#movie_id').val();
            var data = $('#movieUpdateForm').serialize();
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: '/api/movie/' + id,
                data: data,
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success: function (data) {
                    $('#editMovieModal').each(function () {
                        $(this).modal('hide');
                    });
                    $.ajax({
                        type: 'GET',
                        url: `/api/movie/all`,
                        dataType: 'json',
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                        },
                        success(response) {
                            movie.show(response);
                        },
                    });
                },
                error: function (error) {
                    console.log(error);
                },
            });
        });

        $('#movieTableBody').on('click', '#movieDeleteBtn', function (e) {
            var id = $(this).data('id');
            var $tr = $(this).closest('tr');
            console.log(id);
            e.preventDefault();
            bootbox.confirm({
                message: 'Are you sure you want to delete this movie?',
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
                                Authorization:
                                    'Bearer ' +
                                    window.localStorage.getItem('access_token'),
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                // bootbox.alert('success');
                                $tr.find('td').fadeOut(2000, function () {
                                    $tr.remove();
                                });
                            },
                            error: function (error) {
                                console.log(error);
                            },
                        });
                },
            });
        });

        callMovieAjax.show();
    },
};

const callMovieAjax = {
    show() {
        $('#createMovieModal').on('show.bs.modal', function (e) {
            $.ajax({
                type: 'GET',
                url: '/api/genre/all',
                dataType: 'json',
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success(response) {
                    response.forEach((element) => {
                        $('#genres').append(`
                            <input type="checkbox" class="form-check-input" id="genre_id" name="genre_id[]" value="${element.genre_id}">
                            <label class="form-check-label" for="genre_id">${element.genre_name}</label>
                        `);
                    });
                },
            });
            $.ajax({
                type: 'GET',
                url: '/api/producer/all',
                dataType: 'json',
                headers: {
                    Authorization:
                        'Bearer ' + window.localStorage.getItem('access_token'),
                },
                success(response) {
                    response.forEach((element) => {
                        $('#producer_id').append(`
                            <option value="${element.producer_id}">${element.fname} ${element.lname}</option>
                        `);
                    });
                },
            });
        });
    },
};

export default movie;
