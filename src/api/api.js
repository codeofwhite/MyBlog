import http from '../utils/http.js'

export function login(){
    return http.get('/test');
}