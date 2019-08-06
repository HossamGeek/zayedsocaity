import userModel from '../models/user.mdl';
import {findByWithOrService} from '../services/view.service';
import { passwordCompare } from '../../config/imports.config';
import { configUsrToken } from './helper/user.config.hlp';
import { configErrMsg } from './helper/err.config.hlp';


let  Where = [], Required={}, password ='';

const initLogin =(usrBdy)=>{
    let mac_address = usrBdy['mac_address'];
    let usrFindTool = new Set(['email','phone','username']);
    Object.keys(usrBdy).map(key=>{
        if(usrFindTool.has(key)) Where.push({key:usrBdy[key]});
    })
    password = usrBdy['password'];
   Required = {mac_address};    
};



const loginCtrl = {
    view : (req,res)=>{
        initLogin(req.body);
        findByWithOrService(userModel,Required,Where)
        .then(usrData=>{
            if(!usrData.length) res.json(configErrMsg('user not found'));
            else {
                let hashedPassword = usrData[0].password; 
                if(passwordCompare(password,hashedPassword))
                    res.json(configUsrToken(usrData[0]));
                else  res.json(configErrMsg('password not correct'));   
            }
        }).catch(err=>{if(err)res.json(configErrMsg(err))})
    }
}

export default loginCtrl;
