export default function producerModal() {
    return `<div class="modal fade" id="createProducerModal" tabindex="-1" aria-labelledby="createProducerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new Producer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="producerModalForm">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="fname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="lname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="company" class="control-label">Company</label>
                                    <input type="text" class="form-control " id="company" name="company">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createProducerSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editProducerModal" tabindex="-1" aria-labelledby="editProducerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Producer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="producerUpdateForm">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="fname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="producerFname" name="fname">

                                </div>
                                <div class="form-group">
                                    <label for="lname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="producerLname" name="lname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="company" class="control-label">Company</label>
                                    <input type="text" class="form-control " id="producerCompany" name="company">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateProducerBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="producer_id" name="producer_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`;
}
