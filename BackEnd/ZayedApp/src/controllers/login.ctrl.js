import userModel from '../models/user.mdl';
import {findByWithOrService} from '../services/view.service';
import { passwordCompare } from '../../config/imports.config';
import { jwtSign } from '../services/jwt.service';


let tokenId ='' , Where = [], required={}, password ='';
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
    return {data:"success login ",usrData:usrBasicInform,success:true,token_id:tokenId}
};

const initLogin =(bdy)=>{
    let email = bdy['email']
    ,username = bdy['username']
    ,phone = bdy['phone']
    ,mac_address = bdy['mac_address'];
    password = bdy['password'];
    required = {mac_address};

   if(email) Where.push({email:email});
   if (username) Where.push({username:username});
   if (phone) Where.push({_phone:phone});
    
};



const loginCtrl = {
    view : (req,res)=>{
        initLogin(req.body);
        findByWithOrService(userModel,required,Where)
        .then(result=>{
            if(!result.length) res.json(errMsg('user not found'));
            else {
                let hashedPassword = result[0].password; 
                if(passwordCompare(password,hashedPassword))
                    res.json(ConfigResponseUsrData(result[0]));
                else  res.json(errMsg('password not correct'));   
            }
        }).catch(err=> res.json(errMsg(err)))
    }
}

export default loginCtrl;
