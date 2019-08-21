import userModel from '../models/user.mdl';
import { sendMail } from '../services/mailer.service';
import { configUsrToken } from './helper/user.config.hlp';
import { configErrMsg } from './helper/err.config.hlp';
import CreateService from '../services/create.service';

const createService = new CreateService(userModel);


const registerCtrl = {
    create : (req,res)=>{
        createService.create(req.body)
        .then(result=>{
            sendMail(result,{type:"register"});
            res.json(configUsrToken(result));
        })
        .catch(err=> res.json(configErrMsg(err)))
    }
}

export default registerCtrl;
