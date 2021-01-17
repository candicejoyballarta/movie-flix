import actorModal from './actorModal';
const actor = {
    show(response) {
        let template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#createActorModal">
                                Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover  resizable">
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
                        <a href='#' data-bs-toggle='modal' data-bs-target='#editActorModal'
                            id='actorEditBtn' data-id="${element.actor_id}">
                                <i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                        </a></i>
                    </td>
                    <td align='center'>
                        <a href='#' id='actorDeleteBtn' data-id="${element.actor_id}">
                            <i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                        </td>
                    </tr>
            `);
        });
        $('#content').append(actorModal);

        $('.resizable').resizable({
            animate: true,
            start() {},
            stop() {},
        });

        var validationObj = $('#actorModalForm').validate({
            rules: {
                fname: { required: true, maxlength: 16 },
                lname: { required: true, maxlength: 16 },
                notes: { required: true, maxlength: 50 },
            },
            messages: {
                fname: {
                    required: 'Firstname required',
                    maxlength: 'Only 16 char long',
                },
                lname: {
                    required: 'Lastname required',
                    maxlength: 'Only 16 char long',
                },
                notes: {
                    required: 'Must add notes',
                    maxlength: 'Only 50 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationObj.form();

        $('#createActorSubmit').on('click', function (e) {
            if (!validationObj.form()) {
                e.preventDefault();
            }
            var data = $('#actorModalForm').serialize();
            $.ajax({
                type: 'POST',
                url: '/api/actor',
                data: data,
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: 'json',
                success: function (data) {
                    form.submit();
                    $('#createActorModal').each(function () {
                        $(this).modal('hide');
                    });
                    var tr = $('<tr>');
                    tr.append($('<td>').html(data.actor_id));
                    tr.append($('<td>').html(data.fname));
                    tr.append($('<td>').html(data.lname));
                    tr.append($('<td>').html(data.notes));
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

        var validationUpdate = $('#actorUpdateForm').validate({
            rules: {
                fname: { required: true, maxlength: 16 },
                lname: { required: true, maxlength: 16 },
                notes: { required: true, maxlength: 50 },
            },
            messages: {
                fname: {
                    required: 'Firstname required',
                    maxlength: 'Only 16 char long',
                },
                lname: {
                    required: 'Lastname required',
                    maxlength: 'Only 16 char long',
                },
                notes: {
                    required: 'Must add notes',
                    maxlength: 'Only 50 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationUpdate.form();

        $('#updateActorBtn').on('click', function (e) {
            if (!validationUpdate.form()) {
                e.preventDefault();
            }
            var id = $('#actor_id').val();
            var data = $('#actorUpdateForm').serialize();
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: '/api/actor/' + id,
                data: data,
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token'),
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

        $('#actorTableBody').on('click', '#actorDeleteBtn', function (e) {
            var id = $(this).data('id');
            var $tr = $(this).closest('tr');
            console.log(id);
            e.preventDefault();
            bootbox.confirm({
                message: 'Are you sure you want to delete this actor?',
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

export default actor;
