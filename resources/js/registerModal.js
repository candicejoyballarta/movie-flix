export default function registerModal() {
    return `<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Register Account</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="registerForm">
                                <div class="form-group">
                                    <label for="name" class="control-label">Name</label>
                                    <input type="text" class="form-control" id="name" name="name">
                                </div>
                                <div class="form-group">
                                    <label for="email" class="control-label">Email</label>
                                    <input type="email" class="form-control " id="email" name="email"></text>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="control-label">Password</label>
                                    <input type="password" class="form-control " id="passInput" name="password">
                                </div>
                                <div class="form-group">
                                    <label for="cpassword" class="control-label">Confirm Password</label>
                                    <input type="password" class="form-control " id="cpassword" name="cpassword">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="registerSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>`;
}
