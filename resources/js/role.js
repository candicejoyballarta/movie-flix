import roleModal from './roleModal';
const role = {
    show(response) {
        let template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRoleModal">
                            Add
                        </button>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover  resizable">
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
        $('#content').append(roleModal);

        $('.resizable').resizable({
            animate: true,
            start() {},
            stop() {},
        });

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

        $('#createRoleModal').on('hidden.bs.modal', function (e) {
            $('#cform').trigger('reset');
            $('#movie_id').empty();
            $('#actor_id').empty();
        });

        var validationObj = $('#roleModalForm').validate({
            rules: {
                role_name: { required: true, maxlength: 45 },
                movie_id: { required: true },
                actor_id: { required: true },
            },
            messages: {
                genre_name: {
                    required: 'Genre name required',
                    maxlength: 'Only 45 char long',
                },
                movie_id: {
                    required: 'Must select movie',
                },
                actor_id: {
                    required: 'Must select actor',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationObj.form();

        $('#createRoleSubmit').on('click', function (e) {
            if (!validationObj.form()) {
                e.preventDefault();
            }
            var data = $('#roleModalForm').serialize();
            //console.log(data);
            $.ajax({
                type: 'POST',
                url: '/api/role',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
                },
                dataType: 'json',
                success: function (data) {
                    $('#createRoleModal').each(function () {
                        $(this).modal('hide');
                    });
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

        var validationUpdate = $('#roleUpdateForm').validate({
            rules: {
                role_name: { required: true, maxlength: 45 },
                movie_id: { required: true },
                actor_id: { required: true },
            },
            messages: {
                genre_name: {
                    required: 'Genre name required',
                    maxlength: 'Only 45 char long',
                },
                movie_id: {
                    required: 'Must select movie',
                },
                actor_id: {
                    required: 'Must select actor',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationUpdate.form();

        $('#updateRoleBtn').on('click', function (e) {
            if (!validationUpdate.form()) {
                e.preventDefault();
            }
            var id = $('#role_id').val();
            var data = $('#roleUpdateForm').serialize();
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: '/api/role/' + id,
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
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

        $('#roleTableBody').on('click', '#roleDeleteBtn', function (e) {
            var id = $(this).data('id');
            var $tr = $(this).closest('tr');
            console.log(id);
            e.preventDefault();
            bootbox.confirm({
                message: 'Are you sure you want to delete this role?',
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

export default role;
