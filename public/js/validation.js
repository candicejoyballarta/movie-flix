// $('#createMovieSubmit').on('click', function (e) {
//$('#createModalForm').submit(function () {
$(document).ready(function () {
    e.preventDefault();
    console.log('hello');
    var validationObj = $('#movieModalForm').validate({
        rules: {
            title: { required: true, maxlength: 45 },
            plot: { required: true, maxlength: 150 },
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
            if (element.is(':checkbox')) {
                error.insertAfter($('input:checkbox:last').next('label'));
            } else if (element.is('select')) {
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var data = $('#movieModalForm').serialize();
            console.log(data);
            $.ajax({
                type: 'POST',
                url: '/api/movie',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
                        'content'
                    ),
                },
                dataType: 'json',
                success: function (data) {
                    form.submit();
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
        },
    });
    validationObj.form();
    $('#movieModalForm').submit(function (e) {
        if (!validationObj.form()) {
            alert('Form errors');
            e.preventDefault();
        }
    });
});
