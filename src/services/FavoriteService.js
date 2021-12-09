const fav_url = 'http://localhost:5000/favorites';
const favorite_url = 'http://localhost:5000/favorite';

export function getFavs(movieid, userid) {
    return fetch(fav_url + '/user/' + userid + '/movie/' + movieid, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function addFav(favorite) {
    return fetch(favorite_url, {
        body: JSON.stringify(favorite),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());
  }

  export function deleteFav(id) {
    return fetch(fav_url + '/' + id , {
        method: 'DELETE'
    }).then(response => response.json());
  }