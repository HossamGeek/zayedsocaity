import { jwtSign } from '../../services/jwt.service';

let tokenId ;

let usrBasicInform = {
    fname:"",
    lname:"",
    email:"",
    username:"",
    approved:""
    };
let usrSecureInform = {
    id:"",
    location_id:"",
    role_id:""
}    

export const configErrMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
 
export const configUsrToken = (dbUsrData)=>{
    Object.keys(usrBasicInform).map(key=> usrBasicInform[key] = dbUsrData[key]);
    Object.keys(usrSecureInform).map(key=> usrSecureInform[key] = dbUsrData[key]);
    tokenId = Object.assign({},usrBasicInform,usrSecureInform)
    tokenId = jwtSign(tokenId);
    return {data:"success Added user",usrData:usrBasicInform,success:true,token_id:tokenId}
};
