export default function actorModal() {
    return `<div class="modal fade" id="createActorModal" tabindex="-1" aria-labelledby="createActorLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new actor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actorModalForm">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="fname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="lname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="notes" class="control-label">Notes</label>
                                    <input type="text" class="form-control " id="notes" name="notes">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createActorSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editActorModal" tabindex="-1" aria-labelledby="editActorLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update actor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actorUpdateForm">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="actorFname" class="control-label">First Name</label>
                                    <input type="text" class="form-control" id="actorFname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="actorLname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="notes" class="control-label">Year</label>
                                    <input type="text" class="form-control " id="actorNotes" name="notes">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateActorBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="actor_id" name="actor_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`;
}
