import {mac_address,uniqId,hashPassword,Joi} from '../../config/imports.config';

const usrSchemaValidation = {
    username: Joi.string().alphanum().lowercase().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    birthday: Joi.number().integer().min(1900).max(2013),
    fname:Joi.string().regex(/^[a-zA-Z]{3,30}$/),
    lname:Joi.string().regex(/^[a-zA-Z]{3,30}$/),
    email:Joi.string().email().required(),
    phone:Joi.string().regex(/^[0-9]{3,30}$/),
    location_id:Joi.string().required(),
    role_id:Joi.string().required()
};

const usrSchema = Joi.object().keys(usrSchemaValidation);

const usrIsValid = usrData => Joi.validate(usrData, usrSchema);

const usrMidWr = {
    configUserData : (req,res,next)=>{
        let usrBdy = req.body;
        let haveErr = usrIsValid(usrBdy)['error'];
        if(haveErr === null){
            usrBdy['id'] = uniqId('usr%@');
            usrBdy['mac_address'] = mac_address();
            usrBdy['password'] = hashPassword(usrBdy['password']);
            res.json(usrBdy);
            //req.body = usrBdy;
            //next();
        }else  res.json({data:haveErr['details'][0]['message'],success:false});
            
    }
};

export default usrMidWr;