const user_url = 'http://localhost:5000/user';
const users_url = 'http://localhost:5000/users';

export function updateUser(user) {
    return fetch(user_url, {
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    }).then(response => response.json());
}

export function getUser(userId) {
    return fetch(users_url + '/' +  userId, {
        method: 'GET'
    }).then(function (response) {
        if(response.headers.get("content-type")!=null)
            return response.json();
        else return null;
    });
}