const user_login_url = 'http://localhost:5000/login';
const add_user_url = 'http://localhost:5000/user';


export function loginCall(user) {
    return fetch(user_login_url, {
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());
  }

  export function addUser(user) {
    return fetch(add_user_url, {
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());
  }
