import genreModal from './genreModal';
const genre = {
    show(response) {
        let template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createGenreModal">
                            Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover  resizable">
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
        $('#content').append(genreModal);

        $('.resizable').resizable({
            animate: true,
            start() {},
            stop() {},
        });

        var validationObj = $('#genreModalForm').validate({
            rules: {
                genre_name: { required: true, maxlength: 45 },
            },
            messages: {
                genre_name: {
                    required: 'Genre name required',
                    maxlength: 'Only 45 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationObj.form();

        $('#createGenreSubmit').on('click', function (e) {
            //console.log(localStorage.getItem('access_token'));
            if (!validationObj.form()) {
                e.preventDefault();
            }
            var data = $('#genreModalForm').serialize();
            //console.log(data);
            $.ajax({
                type: 'POST',
                url: '/api/genre',
                data: data,
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token'),
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

        var validationUpdate = $('#genreUpdateForm').validate({
            rules: {
                genre_name: { required: true, maxlength: 45 },
            },
            messages: {
                genre_name: {
                    required: 'Genre name required',
                    maxlength: 'Only 45 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationUpdate.form();

        $('#updateGenreBtn').on('click', function (e) {
            if (!validationUpdate.form()) {
                e.preventDefault();
            }
            var id = $('#genre_id').val();
            var data = $('#genreUpdateForm').serialize();
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: '/api/genre/' + id,
                data: data,
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token'),
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

        $('#genreTableBody').on('click', '#genreDeleteBtn', function (e) {
            var id = $(this).data('id');
            var $tr = $(this).closest('tr');
            console.log(id);
            e.preventDefault();
            bootbox.confirm({
                message: 'Are you sure you want to delete this genre?',
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
                                Authorization:
                                    'Bearer ' +
                                    localStorage.getItem('access_token'),
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
    },
};

export default genre;
