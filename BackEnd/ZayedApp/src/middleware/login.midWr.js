import {mac_address,Joi} from '../../config/imports.config';

const loginSchemaValidation = {
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().required(),
    email:Joi.string().email(),
    phone:Joi.string().regex(/^[0-9]{3,30}$/)
};

const initLogin = loginData => {
    let lowerData = new Set(['email','username'])
    Object.keys(loginData).map(k=>{
         loginData[k] = lowerData.has(k) ? loginData[k].toLowerCase() : loginData[k];
    })
    loginData['mac_address'] = mac_address();
    return loginData;
};

const loginSchema = Joi.object().keys(loginSchemaValidation).or('email', 'username','phone');

const loginIsValid = loginData => Joi.validate(loginData, loginSchema);



const loginMidWr = {
    configUserData : (req,res,next)=>{
        let loginBdy = req.body;
        let haveErr = loginIsValid(loginBdy)['error'];
        if(haveErr === null){
            req.body = initLogin(loginBdy);
            next();
        }else res.json({data:haveErr['details'][0]['message'],success:false});
        
    }
};

export default loginMidWr;