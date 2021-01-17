export default function authLogout() {
    return `<span class="navbar-text" id="userName">
                    Already Have an account?
                </span>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <form class="px-4 py-3" id="loginForm">
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control" id="email" name="email"
                                        placeholder="email@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" name="password"
                                        placeholder="Password">
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                    <label class="form-check-label" for="dropdownCheck">
                                        Remember me
                                    </label>
                                </div>
                                <button id="loginSubmit" type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" id="register" data-bs-toggle="modal"
                                data-bs-target="#registerModal">New
                                around here? Sign up</a>
                            <a class="dropdown-item" href="#" id="login" data-bs-toggle="modal"
                                data-bs-target="#loginModal">Login</a>
                        </div>
                    </li>
                </ul>`;
}
