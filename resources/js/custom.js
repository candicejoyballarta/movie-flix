import actor from './actor';
import genre from './genre';
import movie from './movie';
import producer from './producer';
import role from './role';
import registerModal from './registerModal';
import authAccount from './authAccount';
import authLogout from './authLogout';

$('#userLogout').on('click', function (e) {
    //console.log(user);
    $.ajax({
        type: 'POST',
        url: '/api/logout',
        headers: {
            Authorization:
                'Bearer ' + window.localStorage.getItem('access_token'),
        },
        success: function (data) {
            $('.account').html(authLogout());
            console.log(data);
        },
        error: function () {
            alert('Failed to logout.. try again');
            console.log('error');
        },
    });
});

$(document).ready(function () {
    //console.log(hello);
    $('#v-pills-tabContent').append(registerModal);

    $.validator.addMethod('pwcheck', function (value) {
        return (
            /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && // consists of only these
            /[a-z]/.test(value) && // has a lowercase letter
            /\d/.test(value) // has a digit
        );
    });

    var regValidation = $('#registerForm').validate({
        rules: {
            name: { required: true },
            email: { required: true, email: true },
            password: { required: true, pwcheck: true, minlength: 8 },
            cpassword: { required: true, equalTo: '#passInput' },
        },
        messages: {
            name: { required: 'Name required' },
            email: { required: 'Email required', email: 'Enter a valid email' },
            password: {
                required: 'Password required',
                pwcheck:
                    'Password must contain: <br> - a lowercase character <br> - at least 1 digit',
                minlength: 'Must be greater than 8 characters',
            },
            cpassword: {
                required: 'Please confirm password',
                equalTo: 'Password does not match',
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });
    regValidation.form();
    console.log();

    $('#registerSubmit').on('click', function (e) {
        if (!regValidation.form()) {
            e.preventDefault();
        }

        var data = $('#registerForm').serialize();
        $.ajax({
            type: 'POST',
            url: '/api/register',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            dataType: 'json',
            success: function (data) {
                $('#registerModal').each(function () {
                    $(this).modal('hide');
                });
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    var loginValidation = $('#loginForm').validate({
        rules: {
            email: { required: true, email: true },
            password: { required: true },
        },
        messages: {
            email: { required: 'Email required', email: 'Enter a valid email' },
            password: {
                required: 'Password required',
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });
    loginValidation.form();

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        if (!loginValidation.form()) {
            e.preventDefault();
        }
        var data = $('#loginForm').serialize();
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            dataType: 'json',
            success: function (data) {
                console.log('login request sent');
                console.log(data);
                $('.account').html(authAccount(data.user.name));

                window.localStorage.setItem('access_token', data.access_token);
                console.log(window.localStorage.getItem('access_token'));
                console.log($('#logout'));
            },
            error: function (data) {
                alert('Failed to login.. try again');
            },
        });
    });

    $('#search').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'api/movie/search',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
                },
                data: {
                    search: request.term,
                },
                success: function (data) {
                    response(data);
                },
            });
        },
        select: function (event, ui) {
            $('#search').val(ui.item.label);
            $('#sID').val(ui.item.value);
            return false;
        },
    });

    $('.search').on('click', (e) => {
        const term = $('#sID').val();
        $.ajax({
            type: 'GET',
            url: '/api/movie/' + term,
        });
    });

    $('.link').on('click', (e) => {
        const link = e.currentTarget.dataset.id;
        //$('#content').toggle('fold');

        $.ajax({
            type: 'GET',
            url: `/api/${link}/all`,
            dataType: 'json',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
            success(response) {
                switch (link) {
                    case 'movie':
                        movie.show(response);
                        break;

                    case 'actor':
                        actor.show(response);

                        break;

                    case 'producer':
                        producer.show(response);
                        break;

                    case 'genre':
                        genre.show(response);
                        break;

                    case 'role':
                        role.show(response);
                        break;

                    default:
                        break;
                }
            },
        });
    });
});
