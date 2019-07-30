import userModel from '../models/user.mdl';
import {findByWithOrService} from '../services/view.service';
import { passwordCompare } from '../../config/imports.config';
import { configErrMsg, configUsrToken } from './helper/user.config.hlp';


let  Where = [], required={}, password ='';

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
            if(!result.length) res.json(configErrMsg('user not found'));
            else {
                let hashedPassword = result[0].password; 
                if(passwordCompare(password,hashedPassword))
                    res.json(configUsrToken(result[0]));
                else  res.json(configErrMsg('password not correct'));   
            }
        }).catch(err=>{if(err)res.json(configErrMsg(err))})
    }
}

export default loginCtrl;
