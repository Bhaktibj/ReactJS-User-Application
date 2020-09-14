import {authHeader} from '../helpers/auth_header';
import {saveToken, removeToken} from '../helpers';

const apiUrl=process.env.REACT_APP_API_HOST_URL;
export const userService = {
    login,
    logout,
    register,
    getAll,
    deleteUser,
    updateUser,
    getById
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in cookies to keep user logged in between page refreshes
            if(user.data!=null){
                localStorage.setItem('user', JSON.stringify(user.data));
                saveToken('user',user.data,{path:'/home'});
                
            }   
            else{
                return null;
            }
            return user;
            
        });
    
}

function logout() {
    removeToken('user',{path:'/home'});
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/list/user`, requestOptions).then(handleResponse);

    
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/register`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/delete/user/${id}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/read/user/${id}`, requestOptions).then(handleResponse);
}

function updateUser(id, user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    return fetch(`${apiUrl}/update/user/${id}`, requestOptions).then(handleResponse);    
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
