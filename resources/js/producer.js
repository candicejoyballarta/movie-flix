import producerModal from './producerModal';
const producer = {
    show(response) {
        let template = `<div class="container">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#createProducerModal">
                                Add
                        </button>
                        <a href="">Logout</a>
                        <br />
                        <div id="ctable" class="table-responsive">
                            <table class="table table-striped table-hover  resizable">
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
                        <a href='#' data-bs-toggle='modal' data-bs-target='#editProducerModal'
                            id='editbtn' data-id="${element.producer_id}">
                                <i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >
                        </a></i>
                    </td>
                    <td align='center'>
                        <a href='#' id='producerDeleteBtn' data-id="${element.producer_id}">
                            <i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>
                    </td>
                </tr>
            `);
        });
        $('#content').append(producerModal);

        $('.resizable').resizable({
            animate: true,
            start() {},
            stop() {},
        });

        var validationObj = $('#producerModalForm').validate({
            rules: {
                fname: { required: true, maxlength: 16 },
                lname: { required: true, maxlength: 16 },
                company: { required: true, maxlength: 45 },
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
                company: {
                    required: 'Must add notes',
                    maxlength: 'Only 45 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationObj.form();

        $('#createProducerSubmit').on('click', function (e) {
            if (!validationObj.form()) {
                e.preventDefault();
            }
            console.log('submit');
            var data = $('#producerModalForm').serialize();
            $.ajax({
                type: 'POST',
                url: '/api/producer',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
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

        var validationUpdate = $('#producerUpdateForm').validate({
            rules: {
                fname: { required: true, maxlength: 16 },
                lname: { required: true, maxlength: 16 },
                company: { required: true, maxlength: 45 },
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
                company: {
                    required: 'Must add notes',
                    maxlength: 'Only 45 char long',
                },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
        });
        validationUpdate.form();

        $('#updateProducerBtn').on('click', function (e) {
            if (!validationUpdate.form()) {
                e.preventDefault();
            }
            var id = $('#producer_id').val();
            var data = $('#producerUpdateForm').serialize();
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: '/api/producer/' + id,
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
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

        $('#producerTableBody').on('click', '#producerDeleteBtn', function (e) {
            var id = $(this).data('id');
            var $tr = $(this).closest('tr');
            console.log(id);
            e.preventDefault();
            bootbox.confirm({
                message: 'Are you sure you want to delete this producer?',
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

export default producer;
