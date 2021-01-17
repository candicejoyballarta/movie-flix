/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/actor.js":
/*!*******************************!*\
  !*** ./resources/js/actor.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _actorModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actorModal */ "./resources/js/actorModal.js");

var actor = {
  show: function show(response) {
    var template = "<div class=\"container\">\n                        <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#createActorModal\">\n                            Add\n                        </button>\n                        <a href=\"\">Logout</a>\n                        <br />\n                        <div id=\"ctable\" class=\"table-responsive\">\n                            <table class=\"table table-striped table-hover  resizable\">\n                                <thead>\n                                    <tr>\n                                        <th>ID</th>\n                                        <th>Firstname</th>\n                                        <th>Lastname</th>\n                                        <th>Notes</th>\n                                        <th>Edit</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </thead>\n                                <tbody id=\"actorTableBody\">\n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>";
    $('#content').html(template);
    response.forEach(function (element) {
      $('#actorTableBody').append("\n                <tr>\n                    <td>".concat(element.actor_id, "</td>\n                    <td>").concat(element.fname, "</td>\n                    <td>").concat(element.lname, "</td>\n                    <td>").concat(element.notes, "</td>\n                    <td align='center'>\n                        <a href='#' data-bs-toggle='modal' data-bs-target='#editActorModal' id='actorEditBtn' data-id=\"").concat(element.actor_id, "\"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >\n                        </a></i>\n                    </td>\n                    <td align='center'>\n                        <a href='#' id='actorDeleteBtn' data-id=\"").concat(element.actor_id, "\"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>\n                        </td>\n                    </tr>\n            "));
    });
    $('#content').append(_actorModal__WEBPACK_IMPORTED_MODULE_0__.default);
    $('.resizable').resizable({
      animate: true,
      start: function start() {},
      stop: function stop() {}
    });
    var validationObj = $('#actorModalForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 16
        },
        lname: {
          required: true,
          maxlength: 16
        },
        notes: {
          required: true,
          maxlength: 50
        }
      },
      messages: {
        fname: {
          required: 'Firstname required',
          maxlength: 'Only 16 char long'
        },
        lname: {
          required: 'Lastname required',
          maxlength: 'Only 16 char long'
        },
        notes: {
          required: 'Must add notes',
          maxlength: 'Only 50 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        dataType: 'json',
        success: function success(data) {
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
        error: function error(_error) {
          console.log(_error);
        }
      });
    });
    $('#editActorModal').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'actor_id',
        name: 'actor_id',
        value: id
      }).appendTo('#actorUpdateForm');
      $.ajax({
        type: 'GET',
        url: '/api/actor/' + id + '/edit',
        success: function success(data) {
          $('#actorFname').val(data.fname);
          $('#actorLname').val(data.lname);
          $('#actorNotes').val(data.notes);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert('error');
        }
      });
    });
    var validationUpdate = $('#actorUpdateForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 16
        },
        lname: {
          required: true,
          maxlength: 16
        },
        notes: {
          required: true,
          maxlength: 50
        }
      },
      messages: {
        fname: {
          required: 'Firstname required',
          maxlength: 'Only 16 char long'
        },
        lname: {
          required: 'Lastname required',
          maxlength: 'Only 16 char long'
        },
        notes: {
          required: 'Must add notes',
          maxlength: 'Only 50 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        dataType: 'json',
        success: function success(data) {
          console.log(data);
          $('#editActorModal').each(function () {
            $(this).modal('hide');
          });
        },
        error: function error(_error2) {
          console.log(_error2);
        }
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
            className: 'btn-success'
          },
          cancel: {
            label: 'no',
            className: 'btn-danger'
          }
        },
        callback: function callback(result) {
          if (result) $.ajax({
            type: 'DELETE',
            url: '/api/actor/' + id,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            dataType: 'json',
            success: function success(data) {
              console.log(data); // bootbox.alert('success');

              $tr.find('td').fadeOut(2000, function () {
                $tr.remove();
              });
            },
            error: function error(_error3) {
              console.log(_error3);
            }
          });
        }
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actor);

/***/ }),

/***/ "./resources/js/actorModal.js":
/*!************************************!*\
  !*** ./resources/js/actorModal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ actorModal
/* harmony export */ });
function actorModal() {
  return "<div class=\"modal fade\" id=\"createActorModal\" tabindex=\"-1\" aria-labelledby=\"createActorLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Create new actor</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"actorModalForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"fname\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\">\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"lname\" class=\"control-label\">Last name</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"lname\" name=\"lname\"></text>\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"notes\" class=\"control-label\">Notes</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"notes\" name=\"notes\">\n\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"createActorSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"modal\" id=\"editActorModal\" tabindex=\"-1\" aria-labelledby=\"editActorLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Update actor</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"actorUpdateForm\">\n                                <input type=\"hidden\" name=\"_method\" value=\"PUT\">\n                                <div class=\"form-group\">\n                                    <label for=\"actorFname\" class=\"control-label\">First Name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"actorFname\" name=\"fname\">\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"lname\" class=\"control-label\">Plot</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"actorLname\" name=\"lname\"></text>\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"notes\" class=\"control-label\">Year</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"actorNotes\" name=\"notes\">\n\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"updateActorBtn\" type=\"submit\" class=\"btn btn-primary\">Update</button>\n                            <input type=\"hidden\" id=\"actor_id\" name=\"actor_id\">\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>";
}

/***/ }),

/***/ "./resources/js/authAccount.js":
/*!*************************************!*\
  !*** ./resources/js/authAccount.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ authAccount
/* harmony export */ });
function authAccount(name) {
  return "<span class=\"navbar-text\" id=\"userName\">\n                ".concat(name, "\n                </span>\n                <ul class=\"navbar-nav ms-auto\">\n                    <li class=\"nav-item dropdown\">\n                        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\"\n                            data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                            Account\n                        </a>\n                        <div class=\"dropdown-menu dropdown-menu-end\">\n                            <a class=\"dropdown-item\" href=\"#\" id=\"updateUser\" data-bs-toggle=\"modal\"\n                                data-bs-target=\"#updateUserModal\">Edit Account</a>\n                            <a class=\"dropdown-item logout\" href=\"#\" id=\"logout\">LogOut</a>\n                        </div>\n                    </li>\n                </ul>\n\n    ");
}

/***/ }),

/***/ "./resources/js/authLogout.js":
/*!************************************!*\
  !*** ./resources/js/authLogout.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ authLogout
/* harmony export */ });
function authLogout() {
  return "<span class=\"navbar-text\" id=\"userName\">\n                    Already Have an account?\n                </span>\n                <ul class=\"navbar-nav ms-auto\">\n                    <li class=\"nav-item dropdown\">\n                        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\"\n                            data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                            Login\n                        </a>\n                        <div class=\"dropdown-menu dropdown-menu-end\">\n                            <form class=\"px-4 py-3\" id=\"loginForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"email\">Email address</label>\n                                    <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\"\n                                        placeholder=\"email@example.com\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"password\">Password</label>\n                                    <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\"\n                                        placeholder=\"Password\">\n                                </div>\n                                <div class=\"form-check\">\n                                    <input type=\"checkbox\" class=\"form-check-input\" id=\"dropdownCheck\">\n                                    <label class=\"form-check-label\" for=\"dropdownCheck\">\n                                        Remember me\n                                    </label>\n                                </div>\n                                <button id=\"loginSubmit\" type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n                            </form>\n                            <div class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\" id=\"register\" data-bs-toggle=\"modal\"\n                                data-bs-target=\"#registerModal\">New\n                                around here? Sign up</a>\n                            <a class=\"dropdown-item\" href=\"#\" id=\"login\" data-bs-toggle=\"modal\"\n                                data-bs-target=\"#loginModal\">Login</a>\n                        </div>\n                    </li>\n                </ul>";
}

/***/ }),

/***/ "./resources/js/custom.js":
/*!********************************!*\
  !*** ./resources/js/custom.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ "./resources/js/actor.js");
/* harmony import */ var _genre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./genre */ "./resources/js/genre.js");
/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./movie */ "./resources/js/movie.js");
/* harmony import */ var _producer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./producer */ "./resources/js/producer.js");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./role */ "./resources/js/role.js");
/* harmony import */ var _registerModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registerModal */ "./resources/js/registerModal.js");
/* harmony import */ var _authAccount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authAccount */ "./resources/js/authAccount.js");
/* harmony import */ var _authLogout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./authLogout */ "./resources/js/authLogout.js");








$('#userLogout').on('click', function (e) {
  //console.log(user);
  $.ajax({
    type: 'POST',
    url: '/api/logout',
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
    },
    success: function success(data) {
      $('.account').html((0,_authLogout__WEBPACK_IMPORTED_MODULE_7__.default)());
      console.log(data);
    },
    error: function error() {
      alert('Failed to logout.. try again');
      console.log('error');
    }
  });
});
$(document).ready(function () {
  //console.log(hello);
  $('#v-pills-tabContent').append(_registerModal__WEBPACK_IMPORTED_MODULE_5__.default);
  $.validator.addMethod('pwcheck', function (value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && // consists of only these
    /[a-z]/.test(value) && // has a lowercase letter
    /\d/.test(value) // has a digit
    ;
  });
  var regValidation = $('#registerForm').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        pwcheck: true,
        minlength: 8
      },
      cpassword: {
        required: true,
        equalTo: '#passInput'
      }
    },
    messages: {
      name: {
        required: 'Name required'
      },
      email: {
        required: 'Email required',
        email: 'Enter a valid email'
      },
      password: {
        required: 'Password required',
        pwcheck: 'Password must contain: <br> - a lowercase character <br> - at least 1 digit',
        minlength: 'Must be greater than 8 characters'
      },
      cpassword: {
        required: 'Please confirm password',
        equalTo: 'Password does not match'
      }
    },
    errorPlacement: function errorPlacement(error, element) {
      error.insertAfter(element);
    }
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
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType: 'json',
      success: function success(data) {
        $('#registerModal').each(function () {
          $(this).modal('hide');
        });
        console.log(data);
      },
      error: function error(_error) {
        console.log(_error);
      }
    });
  });
  var loginValidation = $('#loginForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      email: {
        required: 'Email required',
        email: 'Enter a valid email'
      },
      password: {
        required: 'Password required'
      }
    },
    errorPlacement: function errorPlacement(error, element) {
      error.insertAfter(element);
    }
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
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType: 'json',
      success: function success(data) {
        console.log('login request sent');
        console.log(data);
        $('.account').html((0,_authAccount__WEBPACK_IMPORTED_MODULE_6__.default)(data.user.name));
        window.localStorage.setItem('access_token', data.access_token);
        console.log(window.localStorage.getItem('access_token'));
        console.log($('#logout'));
      },
      error: function error(data) {
        alert('Failed to login.. try again');
      }
    });
  });
  $('#search').autocomplete({
    source: function source(request, response) {
      $.ajax({
        url: 'api/movie/search',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
        },
        data: {
          search: request.term
        },
        success: function success(data) {
          response(data);
        }
      });
    },
    select: function select(event, ui) {
      $('#search').val(ui.item.label);
      $('#sID').val(ui.item.value);
      return false;
    }
  });
  $('.search').on('click', function (e) {
    var term = $('#sID').val();
    $.ajax({
      type: 'GET',
      url: '/api/movie/' + term
    });
  });
  $('.link').on('click', function (e) {
    var link = e.currentTarget.dataset.id;
    $('#content').toggle('fold');
    $.ajax({
      type: 'GET',
      url: "/api/".concat(link, "/all"),
      dataType: 'json',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      success: function success(response) {
        switch (link) {
          case 'movie':
            _movie__WEBPACK_IMPORTED_MODULE_2__.default.show(response);
            break;

          case 'actor':
            _actor__WEBPACK_IMPORTED_MODULE_0__.default.show(response);
            break;

          case 'producer':
            _producer__WEBPACK_IMPORTED_MODULE_3__.default.show(response);
            break;

          case 'genre':
            _genre__WEBPACK_IMPORTED_MODULE_1__.default.show(response);
            break;

          case 'role':
            _role__WEBPACK_IMPORTED_MODULE_4__.default.show(response);
            break;

          default:
            break;
        }
      }
    });
  });
});

/***/ }),

/***/ "./resources/js/genre.js":
/*!*******************************!*\
  !*** ./resources/js/genre.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _genreModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./genreModal */ "./resources/js/genreModal.js");

var genre = {
  show: function show(response) {
    var template = "<div class=\"container\">\n                        <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#createGenreModal\">\n                            Add\n                        </button>\n                        <a href=\"\">Logout</a>\n                        <br />\n                        <div id=\"ctable\" class=\"table-responsive\">\n                            <table class=\"table table-striped table-hover  resizable\">\n                                <thead>\n                                    <tr>\n                                        <th>ID</th>\n                                        <th>Genre Name</th>\n                                        <th>Edit</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </thead>\n                                <tbody id=\"genreTableBody\">\n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>";
    $('#content').html(template);
    response.forEach(function (element) {
      $('#genreTableBody').append("\n                            <tr>\n                                <td>".concat(element.genre_id, "</td>\n                                <td>").concat(element.genre_name, "</td>\n                                <td align='center'>\n                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editGenreModal' id='editbtn' data-id=\"").concat(element.genre_id, "\"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >\n                                    </a></i>\n                                </td>\n                                <td align='center'>\n                                    <a href='#' id='genreDeleteBtn' data-id=\"").concat(element.genre_id, "\"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>\n                                </td>\n                            </tr>\n            "));
    });
    $('#content').append(_genreModal__WEBPACK_IMPORTED_MODULE_0__.default);
    $('.resizable').resizable({
      animate: true,
      start: function start() {},
      stop: function stop() {}
    });
    var validationObj = $('#genreModalForm').validate({
      rules: {
        genre_name: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        genre_name: {
          required: 'Genre name required',
          maxlength: 'Only 45 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
    });
    validationObj.form();
    $('#createGenreSubmit').on('click', function (e) {
      //console.log(localStorage.getItem('access_token'));
      if (!validationObj.form()) {
        e.preventDefault();
      }

      var data = $('#genreModalForm').serialize(); //console.log(data);

      $.ajax({
        type: 'POST',
        url: '/api/genre',
        data: data,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        dataType: 'json',
        success: function success(data) {
          $('#createGenreModal').each(function () {
            $(this).modal('hide');
          });
          var tr = $('<tr>');
          tr.append($('<td>').html(data.genre_id));
          tr.append($('<td>').html(data.genre_name));
          $('#genreTableBody').prepend(tr);
        },
        error: function error(_error) {
          console.log(_error);
        }
      });
    });
    $('#editGenreModal').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'genre_id',
        name: 'genre_id',
        value: id
      }).appendTo('#genreUpdateForm');
      $.ajax({
        type: 'GET',
        url: '/api/genre/' + id + '/edit',
        success: function success(data) {
          $('#genreName').val(data.genre_name);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert('error');
        }
      });
    });
    var validationUpdate = $('#genreUpdateForm').validate({
      rules: {
        genre_name: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        genre_name: {
          required: 'Genre name required',
          maxlength: 'Only 45 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        dataType: 'json',
        success: function success(data) {
          console.log(data);
          $('#editGenreModal').each(function () {
            $(this).modal('hide');
          });
        },
        error: function error(_error2) {
          console.log('error');
        }
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
            className: 'btn-success'
          },
          cancel: {
            label: 'no',
            className: 'btn-danger'
          }
        },
        callback: function callback(result) {
          if (result) $.ajax({
            type: 'DELETE',
            url: '/api/genre/' + id,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            dataType: 'json',
            success: function success(data) {
              console.log(data); // bootbox.alert('success');

              $tr.find('td').fadeOut(2000, function () {
                $tr.remove();
              });
            },
            error: function error(_error3) {
              console.log(_error3);
            }
          });
        }
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genre);

/***/ }),

/***/ "./resources/js/genreModal.js":
/*!************************************!*\
  !*** ./resources/js/genreModal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ genreModal
/* harmony export */ });
function genreModal() {
  return "<div class=\"modal fade\" id=\"createGenreModal\" tabindex=\"-1\" aria-labelledby=\"createGenreLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Create New Genre</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"genreModalForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"genre_name\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"genre_name\" name=\"genre_name\">\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"createGenreSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"modal\" id=\"editGenreModal\" tabindex=\"-1\" aria-labelledby=\"editGenreLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Update Genre</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"genreUpdateForm\">\n                                <input type=\"hidden\" name=\"_method\" value=\"PUT\">\n                                <div class=\"form-group\">\n                                    <label for=\"genre_name\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"genreName\" name=\"genre_name\">\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"updateGenreBtn\" type=\"submit\" class=\"btn btn-primary\">Update</button>\n                            <input type=\"hidden\" id=\"genre_id\" name=\"genre_id\">\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>";
}

/***/ }),

/***/ "./resources/js/movie.js":
/*!*******************************!*\
  !*** ./resources/js/movie.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _movieModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movieModal */ "./resources/js/movieModal.js");

var movie = {
  show: function show(response) {
    var template = "<div class=\"container\">\n                            <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#createMovieModal\">\n                                Add\n                            </button>\n                            <a href=\"\">Logout</a>\n                            <br />\n                            <div id=\"ctable\" class=\"table-responsive\">\n                                <table class=\"table table-striped table-hover resizable\">\n                                    <thead id=\"cheader\">\n                                        <tr>\n                                            <th>ID</th>\n                                            <th>Title</th>\n                                            <th>Plot</th>\n                                            <th>Year</th>\n                                            <th>Edit</th>\n                                            <th>Delete</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody id=\"movieTableBody\">\n\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>";
    $('#content').html(template);
    response.forEach(function (element) {
      $('#movieTableBody').append("\n                <tr>\n                    <td>".concat(element.movie_id, "</td>\n                    <td>").concat(element.title, "</td>\n                    <td>").concat(element.plot, "</td>\n                    <td>").concat(element.year, "</td>\n                    <td align='center'>\n                        <a href='#' data-bs-toggle='modal' data-bs-target='#editMovieModal' id='editbtn' data-id=\"").concat(element.movie_id, "\"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >\n                        </a></i>\n                    </td>\n                    <td align='center'>\n                        <a href='#' id='movieDeleteBtn' data-id=\"").concat(element.movie_id, "\"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>\n                    </td>\n                </tr>\n            "));
    });
    $('#content').append(_movieModal__WEBPACK_IMPORTED_MODULE_0__.default);
    $('.resizable').resizable({
      animate: true,
      start: function start() {},
      stop: function stop() {}
    });
    var validationObj = $('#movieModalForm').validate({
      rules: {
        title: {
          required: true,
          maxlength: 45
        },
        plot: {
          required: true,
          maxlength: 350
        },
        year: {
          required: true,
          minlength: 4,
          number: true
        },
        producer_id: {
          required: true
        },
        genre_id: {
          required: true,
          minlength: 1
        },
        action: 'required'
      },
      messages: {
        title: {
          required: 'Must add title'
        },
        plot: {
          required: 'Must add movie plot'
        },
        year: {
          required: 'Must be a year'
        },
        producer_id: {
          required: 'Must select producer'
        },
        genre_id: {
          required: 'Must select genre'
        },
        action: 'Please provide data'
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
    });
    validationObj.form();
    $('#createMovieSubmit').on('click', function (e) {
      if (!validationObj.form()) {
        e.preventDefault();
      }

      var data = $('#movieModalForm').serialize();
      console.log(data);
      $.ajax({
        type: 'POST',
        url: '/api/movie',
        data: data,
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        dataType: 'json',
        success: function success(data) {
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
        error: function error(_error) {
          console.log(_error);
        }
      });
    });
    $('#createMovieModal').on('hidden.bs.modal', function (e) {
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
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(response) {
          response.forEach(function (element) {
            $('#movieProd').append("\n                            <option value=\"".concat(element.producer_id, "\">").concat(element.fname, " ").concat(element.lname, "</option>\n                        "));
          });
        }
      });
    });
    $('#editMovieModal').on('show.bs.modal', function (e) {
      $.ajax({
        type: 'GET',
        url: '/api/genre/all',
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(response) {
          response.forEach(function (element) {
            console.log(element);
            $('#editGenres').append("\n                            <input type=\"checkbox\" class=\"form-check-input\" id=\"genre_id".concat(element.genre_id, "\" name=\"genre_id[]\" value=\"").concat(element.genre_id, "\">\n                            <label class=\"form-check-label\" for=\"genre_id\">").concat(element.genre_name, "</label>\n                        "));
          });
        }
      });
    });
    $('#editMovieModal').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'movie_id',
        name: 'movie_id',
        value: id
      }).appendTo('#movieUpdateForm');
      $.ajax({
        type: 'GET',
        url: '/api/movie/' + id + '/edit',
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(data) {
          console.log(data);
          $('#movieTitle').val(data.title);
          $('#moviePlot').val(data.plot);
          $('#movieYear').val(data.year);
          $('#movieProd').val(data.producer_id);
          var genre_id = [];
          data.genres.forEach(function (element) {
            $("#genre_id".concat(element.genre_id)).attr('checked', true);
          });
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert('error');
        }
      });
    });
    $('#editMovieModal').on('hidden.bs.modal', function (e) {
      $('#movieUpdateForm').trigger('reset');
      $('#movieProd').empty();
      $('#editGenres').empty();
    });
    var validationUpdate = $('#movieUpdateForm').validate({
      rules: {
        title: {
          required: true,
          maxlength: 45
        },
        plot: {
          required: true,
          maxlength: 350
        },
        year: {
          required: true,
          minlength: 4,
          number: true
        },
        producer_id: {
          required: true
        },
        genre_id: {
          required: true,
          minlength: 1
        },
        action: 'required'
      },
      messages: {
        title: {
          required: 'Must add title'
        },
        plot: {
          required: 'Must add movie plot'
        },
        year: {
          required: 'Must be a year'
        },
        producer_id: {
          required: 'Must select producer'
        },
        genre_id: {
          required: 'Must select genre'
        },
        action: 'Please provide data'
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(data) {
          $('#editMovieModal').each(function () {
            $(this).modal('hide');
          });
          $.ajax({
            type: 'GET',
            url: "/api/movie/all",
            dataType: 'json',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            success: function success(response) {
              movie.show(response);
            }
          });
        },
        error: function error(_error2) {
          console.log(_error2);
        }
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
            className: 'btn-success'
          },
          cancel: {
            label: 'no',
            className: 'btn-danger'
          }
        },
        callback: function callback(result) {
          if (result) $.ajax({
            type: 'DELETE',
            url: '/api/movie/' + id,
            headers: {
              Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            },
            dataType: 'json',
            success: function success(data) {
              console.log(data); // bootbox.alert('success');

              $tr.find('td').fadeOut(2000, function () {
                $tr.remove();
              });
            },
            error: function error(_error3) {
              console.log(_error3);
            }
          });
        }
      });
    });
    callMovieAjax.show();
  }
};
var callMovieAjax = {
  show: function show() {
    $('#createMovieModal').on('show.bs.modal', function (e) {
      $.ajax({
        type: 'GET',
        url: '/api/genre/all',
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(response) {
          response.forEach(function (element) {
            $('#genres').append("\n                            <input type=\"checkbox\" class=\"form-check-input\" id=\"genre_id\" name=\"genre_id[]\" value=\"".concat(element.genre_id, "\">\n                            <label class=\"form-check-label\" for=\"genre_id\">").concat(element.genre_name, "</label>\n                        "));
          });
        }
      });
      $.ajax({
        type: 'GET',
        url: '/api/producer/all',
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        success: function success(response) {
          response.forEach(function (element) {
            $('#producer_id').append("\n                            <option value=\"".concat(element.producer_id, "\">").concat(element.fname, " ").concat(element.lname, "</option>\n                        "));
          });
        }
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (movie);

/***/ }),

/***/ "./resources/js/movieModal.js":
/*!************************************!*\
  !*** ./resources/js/movieModal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ movieModal
/* harmony export */ });
function movieModal() {
  return "<div class=\"modal fade\" id=\"createMovieModal\" tabindex=\"-1\" aria-labelledby=\"createMovieLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Create new movie</h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <form id=\"movieModalForm\" >\n                    <div class=\"form-group\">\n                        <label for=\"title\" class=\"control-label\">Title</label>\n                        <input type=\"text\" class=\"form-control\" id=\"title\" name=\"title\">\n\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"plot\" class=\"control-label\">Plot</label>\n                        <input type=\"text\" class=\"form-control \" id=\"plot\" name=\"plot\"></text>\n\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"year\" class=\"control-label\">Year</label>\n                        <input type=\"text\" class=\"form-control \" id=\"year\" name=\"year\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"producer_id\" class=\"control-label\">Producer</label>\n                        <select class=\"form-select\" aria-label=\"producer\" id=\"producer_id\" name=\"producer_id\">\n                            <option value=\"\" disabled selected>- Select -</option>\n                        </select>\n                    </div>\n                    <div class=\"form-group\" id=\"genres\">\n                        <label class=\"control-label\">Genre</label><br>\n\n                    </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                <button id=\"createMovieSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n            </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"editMovieModal\" tabindex=\"-1\" aria-labelledby=\"editMovieLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Update movie</h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <form id=\"movieUpdateForm\">\n                    <input type=\"hidden\" name=\"_method\" value=\"PUT\">\n                    <div class=\"form-group\">\n                        <label for=\"movieTitle\" class=\"control-label\">Title</label>\n                        <input type=\"text\" class=\"form-control\" id=\"movieTitle\" name=\"title\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"moviePlot\" class=\"control-label\">Plot</label>\n                        <input type=\"text\" class=\"form-control \" id=\"moviePlot\" name=\"plot\"></text>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"movieYear\" class=\"conrol-label\">Year</label>\n                        <input type=\"text\" class=\"form-control \" id=\"movieYear\" name=\"year\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"producer_id\" class=\"control-label\">Producer</label>\n                        <select class=\"form-select\" aria-label=\"producers\" id=\"movieProd\" name=\"producer_id\">\n                        </select>\n                    </div>\n                    <label class=\"control-label\">Genre</label><br>\n                    <div class=\"form-group\" id=\"editGenres\">\n\n\n                    </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                <button id=\"updateMovieBtn\" type=\"submit\" class=\"btn btn-primary\">Update</button>\n                <input type=\"hidden\" id=\"movie_id\" name=\"movie_id\">\n            </div>\n            </form>\n        </div>\n    </div>\n</div>";
}

/***/ }),

/***/ "./resources/js/producer.js":
/*!**********************************!*\
  !*** ./resources/js/producer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _producerModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./producerModal */ "./resources/js/producerModal.js");

var producer = {
  show: function show(response) {
    var template = "<div class=\"container\">\n                        <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#createProducerModal\">\n                            Add\n                        </button>\n                        <a href=\"\">Logout</a>\n                        <br />\n                        <div id=\"ctable\" class=\"table-responsive\">\n                            <table class=\"table table-striped table-hover  resizable\">\n                                <thead>\n                                    <tr>\n                                        <th>ID</th>\n                                        <th>First Name</th>\n                                        <th>Last Name</th>\n                                        <th>Company</th>\n                                        <th>Edit</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </thead>\n                                <tbody id=\"producerTableBody\">\n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>";
    $('#content').html(template);
    response.forEach(function (element) {
      $('#producerTableBody').append("\n                <tr>\n                    <td>".concat(element.producer_id, "</td>\n                    <td>").concat(element.fname, "</td>\n                    <td>").concat(element.lname, "</td>\n                    <td>").concat(element.company, "</td>\n                    <td align='center'>\n                        <a href='#' data-bs-toggle='modal' data-bs-target='#editProducerModal' id='editbtn' data-id=\"").concat(element.producer_id, "\"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >\n                        </a></i>\n                    </td>\n                    <td align='center'>\n                        <a href='#' id='producerDeleteBtn' data-id=\"").concat(element.producer_id, "\"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>\n                    </td>\n                </tr>\n            "));
    });
    $('#content').append(_producerModal__WEBPACK_IMPORTED_MODULE_0__.default);
    $('.resizable').resizable({
      animate: true,
      start: function start() {},
      stop: function stop() {}
    });
    var validationObj = $('#producerModalForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 16
        },
        lname: {
          required: true,
          maxlength: 16
        },
        company: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        fname: {
          required: 'Firstname required',
          maxlength: 'Only 16 char long'
        },
        lname: {
          required: 'Lastname required',
          maxlength: 'Only 16 char long'
        },
        company: {
          required: 'Must add notes',
          maxlength: 'Only 45 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function success(data) {
          //console.log(data);
          // $("myModal").modal("hide");
          $('#createProducerModal').each(function () {
            $(this).modal('hide');
          }); // $.each(data, function(key, value){

          var tr = $('<tr>');
          tr.append($('<td>').html(data.producer_id));
          tr.append($('<td>').html(data.fname));
          tr.append($('<td>').html(data.lname));
          tr.append($('<td>').html(data.company));
          $('#producerTableBody').prepend(tr);
        },
        error: function error(_error) {
          console.log(_error);
        }
      });
    });
    $('#editProducerModal').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'producer_id',
        name: 'producer_id',
        value: id
      }).appendTo('#producerUpdateForm');
      $.ajax({
        type: 'GET',
        url: '/api/producer/' + id + '/edit',
        success: function success(data) {
          $('#producerFname').val(data.fname);
          $('#producerLname').val(data.lname);
          $('#producerCompany').val(data.company);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert('error');
        }
      });
    });
    var validationUpdate = $('#producerUpdateForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 16
        },
        lname: {
          required: true,
          maxlength: 16
        },
        company: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        fname: {
          required: 'Firstname required',
          maxlength: 'Only 16 char long'
        },
        lname: {
          required: 'Lastname required',
          maxlength: 'Only 16 char long'
        },
        company: {
          required: 'Must add notes',
          maxlength: 'Only 45 char long'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function success(data) {
          console.log(data);
          $('#editProducerModal').each(function () {
            $(this).modal('hide');
          });
        },
        error: function error(_error2) {
          console.log(_error2);
        }
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
            className: 'btn-success'
          },
          cancel: {
            label: 'no',
            className: 'btn-danger'
          }
        },
        callback: function callback(result) {
          if (result) $.ajax({
            type: 'DELETE',
            url: '/api/producer/' + id,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function success(data) {
              console.log(data); // bootbox.alert('success');

              $tr.find('td').fadeOut(2000, function () {
                $tr.remove();
              });
            },
            error: function error(_error3) {
              console.log(_error3);
            }
          });
        }
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (producer);

/***/ }),

/***/ "./resources/js/producerModal.js":
/*!***************************************!*\
  !*** ./resources/js/producerModal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ producerModal
/* harmony export */ });
function producerModal() {
  return "<div class=\"modal fade\" id=\"createProducerModal\" tabindex=\"-1\" aria-labelledby=\"createProducerLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Create new Producer</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"producerModalForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"fname\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\">\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"lname\" class=\"control-label\">Last name</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"lname\" name=\"lname\"></text>\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"company\" class=\"control-label\">Company</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"company\" name=\"company\">\n\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"createProducerSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"modal\" id=\"editProducerModal\" tabindex=\"-1\" aria-labelledby=\"editProducerLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Update Producer</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"producerUpdateForm\">\n                                <input type=\"hidden\" name=\"_method\" value=\"PUT\">\n                                <div class=\"form-group\">\n                                    <label for=\"fname\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"producerFname\" name=\"fname\">\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"lname\" class=\"control-label\">Last name</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"producerLname\" name=\"lname\"></text>\n\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"company\" class=\"control-label\">Company</label>\n                                    <input type=\"text\" class=\"form-control \" id=\"producerCompany\" name=\"company\">\n\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"updateProducerBtn\" type=\"submit\" class=\"btn btn-primary\">Update</button>\n                            <input type=\"hidden\" id=\"producer_id\" name=\"producer_id\">\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>";
}

/***/ }),

/***/ "./resources/js/registerModal.js":
/*!***************************************!*\
  !*** ./resources/js/registerModal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ registerModal
/* harmony export */ });
function registerModal() {
  return "<div class=\"modal fade\" id=\"registerModal\" tabindex=\"-1\" aria-labelledby=\"registerLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Register Account</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"registerForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"name\" class=\"control-label\">Name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"email\" class=\"control-label\">Email</label>\n                                    <input type=\"email\" class=\"form-control \" id=\"email\" name=\"email\"></text>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"password\" class=\"control-label\">Password</label>\n                                    <input type=\"password\" class=\"form-control \" id=\"passInput\" name=\"password\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"cpassword\" class=\"control-label\">Confirm Password</label>\n                                    <input type=\"password\" class=\"form-control \" id=\"cpassword\" name=\"cpassword\">\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"registerSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>";
}

/***/ }),

/***/ "./resources/js/role.js":
/*!******************************!*\
  !*** ./resources/js/role.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _roleModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roleModal */ "./resources/js/roleModal.js");

var role = {
  show: function show(response) {
    var template = "<div class=\"container\">\n                        <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#createRoleModal\">\n                            Add\n                        </button>\n                        <br />\n                        <div id=\"ctable\" class=\"table-responsive\">\n                            <table class=\"table table-striped table-hover  resizable\">\n                                <thead>\n                                    <tr>\n                                        <th>ID</th>\n                                        <th>Role Name</th>\n                                        <th>Movie</th>\n                                        <th>Actor</th>\n                                        <th>Edit</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </thead>\n                                <tbody id=\"roleTableBody\">\n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>";
    $('#content').html(template);
    response.forEach(function (element) {
      $('#roleTableBody').append("\n                            <tr>\n                                <td>".concat(element.role_id, "</td>\n                                <td>").concat(element.role_name, "</td>\n                                <td>").concat(element.movie_id, "</td>\n                                <td>").concat(element.actor_id, "</td>\n                                <td align='center'>\n                                    <a href='#' data-bs-toggle='modal' data-bs-target='#editRoleModal' id='editbtn' data-id=\"").concat(element.role_id, "\"><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' >\n                                    </a></i>\n                                </td>\n                                <td align='center'>\n                                    <a href='#' id='roleDeleteBtn' data-id=\"").concat(element.role_id, "\"><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>\n                                </td>\n                            </tr>\n                        "));
    });
    $('#content').append(_roleModal__WEBPACK_IMPORTED_MODULE_0__.default);
    $('.resizable').resizable({
      animate: true,
      start: function start() {},
      stop: function stop() {}
    });
    $('#createRoleModal').on('show.bs.modal', function (e) {
      // Populate dropdown with producers on movie modal show
      console.log(e);
      $.ajax({
        type: 'GET',
        url: '/api/movie/all',
        success: function success(response) {
          response.forEach(function (element) {
            $('#movie_id').append("\n                                        <option value=\"".concat(element.movie_id, "\">").concat(element.title, "</option>\n                                    "));
          });
        }
      });
    });
    $('#createRoleModal').on('show.bs.modal', function (e) {
      // Populate dropdown with producers on movie modal show
      console.log(e);
      $.ajax({
        type: 'GET',
        url: '/api/actor/all',
        success: function success(response) {
          response.forEach(function (element) {
            $('#actor_id').append("\n                                        <option value=\"".concat(element.actor_id, "\">").concat(element.fname, " ").concat(element.lname, "</option>\n                                    "));
          });
        }
      });
    });
    $('#createRoleModal').on('hidden.bs.modal', function (e) {
      $('#cform').trigger('reset');
      $('#movie_id').empty();
      $('#actor_id').empty();
    });
    var validationObj = $('#roleModalForm').validate({
      rules: {
        role_name: {
          required: true,
          maxlength: 45
        },
        movie_id: {
          required: true
        },
        actor_id: {
          required: true
        }
      },
      messages: {
        genre_name: {
          required: 'Genre name required',
          maxlength: 'Only 45 char long'
        },
        movie_id: {
          required: 'Must select movie'
        },
        actor_id: {
          required: 'Must select actor'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
    });
    validationObj.form();
    $('#createRoleSubmit').on('click', function (e) {
      if (!validationObj.form()) {
        e.preventDefault();
      }

      var data = $('#roleModalForm').serialize(); //console.log(data);

      $.ajax({
        type: 'POST',
        url: '/api/role',
        data: data,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function success(data) {
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
        error: function error(_error) {
          console.log(_error);
        }
      });
    });
    $('#editRoleModal').on('show.bs.modal', function (e) {
      // Populate dropdown with producers on movie modal show
      console.log(e);
      $.ajax({
        type: 'GET',
        url: '/api/movie/all',
        success: function success(response) {
          response.forEach(function (element) {
            $('#roleMovie').append("\n                                        <option value=\"".concat(element.movie_id, "\">").concat(element.title, "</option>\n                                    "));
          });
        }
      });
    });
    $('#editRoleModal').on('show.bs.modal', function (e) {
      // Populate dropdown with producers on movie modal show
      console.log(e);
      $.ajax({
        type: 'GET',
        url: '/api/actor/all',
        success: function success(response) {
          response.forEach(function (element) {
            $('#roleActor').append("\n                                        <option value=\"".concat(element.actor_id, "\">").concat(element.fname, " ").concat(element.lname, "</option>\n                                    "));
          });
        }
      });
    });
    $('#editRoleModal').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'role_id',
        name: 'role_id',
        value: id
      }).appendTo('#roleUpdateForm');
      $.ajax({
        type: 'GET',
        url: '/api/role/' + id + '/edit',
        success: function success(data) {
          $('#roleName').val(data.role_name);
          $('#roleMovie').val(data.movie_id);
          $('#roleActor').val(data.actor_id);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert('error');
        }
      });
    });
    $('#editRoleModal').on('hidden.bs.modal', function (e) {
      $('#roleUpdateForm').trigger('reset');
      $('#roleMovie').empty();
      $('#roleActor').empty();
    });
    var validationUpdate = $('#roleUpdateForm').validate({
      rules: {
        role_name: {
          required: true,
          maxlength: 45
        },
        movie_id: {
          required: true
        },
        actor_id: {
          required: true
        }
      },
      messages: {
        genre_name: {
          required: 'Genre name required',
          maxlength: 'Only 45 char long'
        },
        movie_id: {
          required: 'Must select movie'
        },
        actor_id: {
          required: 'Must select actor'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      }
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
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function success(data) {
          console.log(data);
          $('#editRoleModal').each(function () {
            $(this).modal('hide');
          });
        },
        error: function error(_error2) {
          console.log(_error2);
        }
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
            className: 'btn-success'
          },
          cancel: {
            label: 'no',
            className: 'btn-danger'
          }
        },
        callback: function callback(result) {
          if (result) $.ajax({
            type: 'DELETE',
            url: '/api/role/' + id,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function success(data) {
              console.log(data); // bootbox.alert('success');

              $tr.find('td').fadeOut(2000, function () {
                $tr.remove();
              });
            },
            error: function error(_error3) {
              console.log(_error3);
            }
          });
        }
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (role);

/***/ }),

/***/ "./resources/js/roleModal.js":
/*!***********************************!*\
  !*** ./resources/js/roleModal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ roleModal
/* harmony export */ });
function roleModal() {
  return "<div class=\"modal fade\" id=\"createRoleModal\" tabindex=\"-1\" aria-labelledby=\"createRoleLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Create New Role</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"roleModalForm\">\n                                <div class=\"form-group\">\n                                    <label for=\"role_name\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"role_name\" name=\"role_name\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"movie_id\" class=\"control-label\">Movie</label>\n                                    <select class=\"form-select\" aria-label=\"movies\" id=\"movie_id\" name=\"movie_id\">\n                                        <option value=\"\" disabled selected>- Select -</option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"actor_id\" class=\"control-label\">Actor</label>\n                                    <select class=\"form-select\" aria-label=\"actors\" id=\"actor_id\" name=\"actor_id\">\n                                        <option value=\"\" disabled selected>- Select -</option>\n                                    </select>\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"createRoleSubmit\" type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"modal\" id=\"editRoleModal\" tabindex=\"-1\" aria-labelledby=\"editRoleLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog\">\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Update Role</h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form id=\"roleUpdateForm\">\n                                <input type=\"hidden\" name=\"_method\" value=\"PUT\">\n                                <div class=\"form-group\">\n                                    <label for=\"role_name\" class=\"control-label\">First name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"roleName\" name=\"role_name\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"movie_id\" class=\"control-label\">Movie</label>\n                                    <select class=\"form-select\" aria-label=\"movies\" id=\"roleMovie\" name=\"movie_id\">\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"actor_id\" class=\"control-label\">Actor</label>\n                                    <select class=\"form-select\" aria-label=\"actors\" id=\"roleActor\" name=\"actor_id\">\n                                    </select>\n                                </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Close</button>\n                            <button id=\"updateRoleBtn\" type=\"submit\" class=\"btn btn-primary\">Update</button>\n                            <input type=\"hidden\" id=\"role_id\" name=\"role_id\">\n                        </div>\n                        </form>\n                    </div>\n                </div>\n            </div>";
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/custom.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;