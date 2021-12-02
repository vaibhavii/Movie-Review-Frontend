export const get_movie_url = 'http://localhost:5000/movie' 


export function getMovieDetails() {
    return fetch(get_movie_url, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}
