import cookie from 'react-cookies';

export const authHeader=()=> {
    let user = cookie.load('user');
    if (user !==undefined) {
        return { 'Authorization':user };
    } else {
        return false;
    }
}