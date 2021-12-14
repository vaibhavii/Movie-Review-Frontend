const url = 'http://localhost:5000/totalreviewgenre';
const url1 = 'http://localhost:5000/avgboxoffice';
const url2 = 'http://localhost:5000/avgratings';

export function getTotalByGenre() {
    return fetch(url, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function getRatingByGenre() {
    return fetch(url1, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}

export function getBOByGenre() {
    return fetch(url2, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}
