export default function movieModal() {
    return `<div class="modal fade" id="createMovieModal" tabindex="-1" aria-labelledby="createMovieLabel" aria-hidden="true">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create new movie</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="movieModalForm" >
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
                    <div class="form-group">
                        <label for="producer_id" class="control-label">Producer</label>
                        <select class="form-select" aria-label="producer" id="producer_id" name="producer_id">
                            <option value="" disabled selected>- Select -</option>
                        </select>
                    </div>
                    <div class="form-group" id="genres">
                        <label class="control-label">Genre</label><br>

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
                <form id="movieUpdateForm">
                    <input type="hidden" name="_method" value="PUT">
                    <div class="form-group">
                        <label for="movieTitle" class="control-label">Title</label>
                        <input type="text" class="form-control" id="movieTitle" name="title">
                    </div>
                    <div class="form-group">
                        <label for="moviePlot" class="control-label">Plot</label>
                        <input type="text" class="form-control " id="moviePlot" name="plot"></text>
                    </div>
                    <div class="form-group">
                        <label for="movieYear" class="conrol-label">Year</label>
                        <input type="text" class="form-control " id="movieYear" name="year">
                    </div>
                    <div class="form-group">
                        <label for="producer_id" class="control-label">Producer</label>
                        <select class="form-select" aria-label="producers" id="movieProd" name="producer_id">
                        </select>
                    </div>
                    <label class="control-label">Genre</label><br>
                    <div class="form-group" id="editGenres">


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
</div>`;
}
