import userModel from '../models/user.mdl';
import createService from '../services/create.service';
import { sendMail } from '../services/mailer.service';
import { configErrMsg, configUsrToken } from './helper/user.config.hlp';



const registerCtrl = {
    create : (req,res)=>{
        createService(userModel,req.body)
        .then(result=>{
            sendMail(result,{type:"register"});
            res.json(configUsrToken(result));
        })
        .catch(err=> res.json(configErrMsg(err)))
    }
}

export default registerCtrl;
