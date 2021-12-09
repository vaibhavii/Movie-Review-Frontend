export const movie_url = 'http://localhost:5000/movie' 
export const omdb_url = 'http://www.omdbapi.com/?apikey=d799ca1&t='


export function getMovieDetails() {
    return fetch(movie_url, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function getOmdnMovieDetails(movie_title) {
    return fetch(omdb_url + movie_title, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function searchMovie(keyword) {
    return fetch('http://localhost:5000/search/' + keyword, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function addMovieDetails(movie) {
    return fetch(movie_url, {
        body: JSON.stringify(movie),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());
  }

  export function updateMovieDetails(movie) {
    return fetch(movie_url , {
        body: JSON.stringify(movie),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    }).then(response => response.json());
  }

  export function deleteMovie(id) {
    return fetch(movie_url + '/' + id , {
        method: 'DELETE'
    }).then(response => response.json());
  }
