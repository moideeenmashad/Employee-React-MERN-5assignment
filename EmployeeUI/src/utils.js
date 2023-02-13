import jwt_decode from "jwt-decode";

export const decodeJWT =(token)=>jwt_decode(token);

export const isAdmin=(token)=>decodeJWT(token).role==='ADMIN'?true:false;