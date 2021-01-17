export default function genreModal() {
    return `<div class="modal fade" id="createGenreModal" tabindex="-1" aria-labelledby="createGenreLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Genre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="genreModalForm">
                                <div class="form-group">
                                    <label for="genre_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="genre_name" name="genre_name">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createGenreSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editGenreModal" tabindex="-1" aria-labelledby="editGenreLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Genre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="genreUpdateForm">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="genre_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="genreName" name="genre_name">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateGenreBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="genre_id" name="genre_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`;
}
