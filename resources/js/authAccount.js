export default function authAccount(name) {
    return `<span class="navbar-text" id="userName">
                ${name}
                </span>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Account
                        </a>

                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#" id="updateUser" data-bs-toggle="modal"
                                data-bs-target="#updateUserModal">Edit Account</a>
                                <a class="dropdown-item logout" href="#" id="userLogout">LogOut</a>
                        </div>
                        <li class="nav-link"></li>
                    </li>
                </ul>

    `;
}
