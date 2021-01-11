const modals = {
    movie: `<div class="modal fade" id="createMovieModal" tabindex="-1" aria-labelledby="createMovieLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new movie</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="title" class="control-label">Title</label>
                                    <input type="text" class="form-control" id="title" name="title">

                                </div>
                                <div class="form-group">
                                    <label for="plot" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="plot" name="plot"></text>

                                </div>
                                <div class="form-group">
                                    <label for="year" class="control-label">Year</label>
                                    <input type="text" class="form-control " id="year" name="year">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="createMovieSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="editMovieModal" tabindex="-1" aria-labelledby="editMovieLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update movie</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="movieUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="movieTitle" class="control-label">Title</label>
                                    <input type="text" class="form-control" id="movieTitle" name="movieTitle">

                                </div>
                                <div class="form-group">
                                    <label for="moviePlot" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="moviePlot" name="moviePlot"></text>

                                </div>
                                <div class="form-group">
                                    <label for="movieYear" class="conrol-label">Year</label>
                                    <input type="text" class="form-control " id="movieYear" name="movieYear">

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="updateMovieBtn" type="submit" class="btn btn-primary">Update</button>
                            <input type="hidden" id="movie_id" name="movie_id">
                        </div>
                        </form>
                    </div>
                </div>
            </div>`,

    actor: `<div class="modal fade" id="createActorModal" tabindex="-1" aria-labelledby="createActorLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new actor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
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
                            <form id="actorUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="actorFname" class="control-label">First Name</label>
                                    <input type="text" class="form-control" id="actorFname" name="actorFname">

                                </div>
                                <div class="form-group">
                                    <label for="actorLname" class="control-label">Plot</label>
                                    <input type="text" class="form-control " id="actorLname" name="actorLname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="actorNotes" class="control-label">Year</label>
                                    <input type="text" class="form-control " id="actorNotes" name="actorNotes">

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
            </div>`,

    producer: `<div class="modal fade" id="createProducerModal" tabindex="-1" aria-labelledby="createProducerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new Producer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="pFname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="pFname" name="pFname">

                                </div>
                                <div class="form-group">
                                    <label for="pLname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="pLname" name="pLname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="pNotes" class="control-label">Notes</label>
                                    <input type="text" class="form-control " id="pNotes" name="pNotes">

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
                            <form id="producerUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="producerFname" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="producerFname" name="producerFname">

                                </div>
                                <div class="form-group">
                                    <label for="producerLname" class="control-label">Last name</label>
                                    <input type="text" class="form-control " id="producerLname" name="producerLname"></text>

                                </div>
                                <div class="form-group">
                                    <label for="producerNotes" class="control-label">Notes</label>
                                    <input type="text" class="form-control " id="producerNotes" name="producerNotes">

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
            </div>`,
    genre: `<div class="modal fade" id="createGenreModal" tabindex="-1" aria-labelledby="createGenreLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Genre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
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
                            <form id="genreUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="editGenre_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="editGenre_name" name="editGenre_name">
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
            </div>`,
    role: `<div class="modal fade" id="createRoleModal" tabindex="-1" aria-labelledby="createRoleLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Role</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cform" method="post" action="#">
                                <div class="form-group">
                                    <label for="role_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="role_name" name="role_name">
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
                            <form id="roleUpdateForm" method="#" action="#">
                                <input type="hidden" name="_method" value="PUT">
                                <div class="form-group">
                                    <label for="editRole_name" class="control-label">First name</label>
                                    <input type="text" class="form-control" id="editRole_name" name="editRole_name">
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
            </div>`,
};

export default { modals };
