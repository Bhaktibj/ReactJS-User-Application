import cookie from 'react-cookies';
// import { alertActions } from '../actions';

export const saveToken=(key,value,path)=>{
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    cookie.save(key,value,{
        expires:expires,
        secure:false,
        maxAge:1000,
        path:path

    });
    return true;
}

export const removeToken=(key, path)=>{
    if(key !== undefined)
    {
    cookie.remove(key, {path:path});
    return true;
    }
    else{
        return false;
    }
}

export const getToken=(key)=>{
    let user_token = null;
    if(key!==undefined)
    {
        user_token = cookie.load(key);
        return user_token;
    }
    else{
        return user_token;
    }
}