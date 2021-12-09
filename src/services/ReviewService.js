export const movie_url = 'http://localhost:5000/review/movie' 
export const user_url = 'http://localhost:5000/review/user'
export const review_url = 'http://localhost:5000/review'

export function getReviewsByMovie(movieId) {
    return fetch(movie_url + '/' + movieId, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function getReviewsByMovieAndUser(movieId, userId) {
    return fetch(movie_url + '/' + movieId + '/user' + '/' + userId, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function addReview(review) {
    return fetch(review_url, {
        body: JSON.stringify(review),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());
}

export function editReview(review) {
    return fetch(review_url, {
        body: JSON.stringify(review),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    }).then(response => response.json());
}

export function deleteReview(id) {
    return fetch(review_url + '/' + id , {
        method: 'DELETE'
    }).then(response => response.json());
  }