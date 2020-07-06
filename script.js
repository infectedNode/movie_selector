const movie_input = document.getElementById('movie-input');

function getMovies() {
    const input = $('#movie-input');
    let search = input.val().trim();
    if(search.length >= 3) {
        const API_KEY = "ee6320ef"; // Don't Use My API KEY Create ur own "-_-"
        const URL = `http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}&page=1&type=movie`;

        $.get(URL, (data) => {
            if(data.Response == "True") {
                let movies = data.Search.slice(0, 3); 
                $('.input .search .options').empty();
                movies.forEach(movie => {
                    $('.input .search .options').append(`
                        <div class="movie">
                            <div class="name">
                                <p>${movie.Title}</p>
                            </div>
                            <div class="image">
                                <img src="${movie.Poster}" alt="">
                            </div>
                        </div>  
                    `);
                });
                $('.input .search .options').addClass('show');
                $('.wall').addClass('show');
                $('.input .search .options .movie').click(function() {
                    let pillLength = $('.input .pill').length;
                    if(pillLength >= 5) {
                        $('.input .search .options').removeClass('show');
                        $('.wall').removeClass('show');
                        $('.input .search').addClass('hide');
                    } else {
                        let text = $(this).children('.name').children('p').text().trim();
                        
                        $(`
                            <div class="pill">
                                <p>${text} <span class="remove"><i class="fas fa-times"></i></span></p>
                            </div>
                        `).insertBefore('.input .search');
    
                        $('.input .search .options').removeClass('show');
                        $('.wall').removeClass('show');
                        input.val('').focus();
                        
                        $('.input .pill p .remove').click(function() {
                            $(this).parent().parent().remove();
                            input.val('').focus();
                            $('.input .search').removeClass('hide');
                        });

                        if($('.input .pill').length >= 5) {
                            $('.input .search .options').removeClass('show');
                            $('.wall').removeClass('show');
                            $('.input .search').addClass('hide');
                        }    
                    }
                    
                });
            } else {
                $('.input .search .options').removeClass('show');
                $('.wall').removeClass('show');
                console.log("Movie Not Found!");
            }
        });
    } else {
        $('.input .search .options').removeClass('show');
        $('.wall').removeClass('show');
    }
}

let id = 0;

movie_input.addEventListener("input", () => {
    clearTimeout(id);
    id = setTimeout(getMovies, 200);
})

$('.wall').click(function(){
    $('.input .search .options').removeClass('show');
    $('.wall').removeClass('show'); 
});