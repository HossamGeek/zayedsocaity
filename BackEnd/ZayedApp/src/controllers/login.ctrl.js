import userModel from '../models/user.mdl';
import ViewService from '../services/view.service';
import { passwordCompare } from '../../config/imports.config';
import { configUsrToken } from './helper/user.config.hlp';
import { configErrMsg } from './helper/err.config.hlp';

const viewService = new ViewService(userModel);

let  Where = [], Required={}, password ='';

const setLoginData =(usrBdy)=>{
    //let mac_address = usrBdy['mac_address'];
    let usrFindKeys = new Set(['email','phone','username']);
    Object.keys(usrBdy).map(key=>{
        if(usrFindKeys.has(key)) Where = {[key]:usrBdy[key]};
    })
    password = usrBdy['password'];
    //Required = {mac_address};    
};


const passwordValidation = (usrData)=>{
    let hashedPassword = usrData.password;
    if(passwordCompare(password,hashedPassword))
        return(configUsrToken(usrData));
    return(configErrMsg('password not correct'));
}

const userIsFound = (usrData)=>{
    if(!usrData.length) return(configErrMsg('user not found'));
    return passwordValidation(usrData[0]);
    
}

const loginCtrl = {
    view : (req,res)=>{
        setLoginData(req.body);
        viewService.findAll(Where)
        .then(usrData=>res.json(userIsFound(usrData)))
        .catch(err=>{if(err)res.json(configErrMsg(err))})
    }
}

export default loginCtrl;
