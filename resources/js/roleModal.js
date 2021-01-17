export default function roleModal() {
    return `<div class="modal fade" id="createRoleModal" tabindex="-1" aria-labelledby="createRoleLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Role</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="roleModalForm">
                                <div class="form-group">
                                    <label for="role_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="role_name" name="role_name">
                                </div>
                                <div class="form-group">
                                    <label for="movie_id" class="control-label">Movie</label>
                                    <select class="form-select" aria-label="movies" id="movie_id" name="movie_id">
                                        <option value="" disabled selected>- Select -</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="actor_id" class="control-label">Actor</label>
                                    <select class="form-select" aria-label="actors" id="actor_id" name="actor_id">
                                        <option value="" disabled selected>- Select -</option>
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createRoleSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Role</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="roleUpdateForm">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="role_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="roleName" name="role_name">
                                </div>
                                <div class="form-group">
                                    <label for="movie_id" class="control-label">Movie</label>
                                    <select class="form-select" aria-label="movies" id="roleMovie" name="movie_id">
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="actor_id" class="control-label">Actor</label>
                                    <select class="form-select" aria-label="actors" id="roleActor" name="actor_id">
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateRoleBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="role_id" name="role_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`;
}
