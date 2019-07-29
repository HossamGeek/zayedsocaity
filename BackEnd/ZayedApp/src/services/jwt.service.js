import {jwt} from '../../config/imports.config';

const ApiKey = process.env.ApiKEY;

export const jwtSign = data =>  jwt.sign(data , ApiKey ,{expiresIn:"10h"}); 
            
    
export const jwtVerify = token => jwt.verify(token , ApiKey,(err,data) =>{
    if(data) return ({data:data,success:true});
    else return({data:'Session Expired',success:false,key:4200});
}) 

