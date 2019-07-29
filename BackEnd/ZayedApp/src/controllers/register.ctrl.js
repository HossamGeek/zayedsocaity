import userModel from '../models/user.mdl';
import createService from '../services/create.service';
import { jwtSign } from '../services/jwt.service';
import { sendMail } from '../services/mailer.service';

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

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
 
const ConfigResponseUsrData = (dbUsrData)=>{
    Object.keys(usrBasicInform).map(key=> usrBasicInform[key] = dbUsrData[key]);
    Object.keys(usrSecureInform).map(key=> usrSecureInform[key] = dbUsrData[key]);
    tokenId = Object.assign({},usrBasicInform,usrSecureInform)
    tokenId = jwtSign(tokenId);
    return {data:"success Added user",usrData:usrBasicInform,success:true,token_id:tokenId}
};


const registerCtrl = {
    create : (req,res)=>{
        createService(userModel,req.body)
        .then(result=>{
            sendMail(result,{type:"register"});
            res.json(ConfigResponseUsrData(result));
        })
        .catch(err=> res.json(errMsg(err)))
    }
}

export default registerCtrl;
