import {mac_address,uniqId,hashPassword,Joi,passwordRegex,generateCode} from '../../config/imports.config';

const usrSchemaValidation = {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(passwordRegex).required(),
    birthday: Joi.string().required(),
    fname:Joi.string().regex(/^[a-zA-Z]{3,30}$/).trim(),
    lname:Joi.string().regex(/^[a-zA-Z]{3,30}$/).trim(),
    email:Joi.string().email().required(),
    phone:Joi.string().regex(/^[0-9]{3,30}$/),
    location_id:Joi.string().required(),
    role_id:Joi.string().required()
};

const initUsr = usrData => {
    let lowerData = new Set(['email','username','fname','lname' ])
    Object.keys(usrData).map(k=>{
         usrData[k] = lowerData.has(k) ? usrData[k].toLowerCase() : usrData[k];
    })
    usrData['id'] = uniqId('usr%@');
    usrData['mac_address'] = mac_address();
    usrData['generate_code'] = generateCode();
    usrData['password'] = hashPassword(usrData['password']);
    return usrData;
};

const usrSchema = Joi.object().keys(usrSchemaValidation);

const usrIsValid = usrData => Joi.validate(usrData, usrSchema);

const errMsg = {
    password : "Passwords will contain at least 6 characters in length and "+
    "least 1 upper and 1 lower case letter and least 1 number" + 
    " and least given special characters (!$%&?@)",
    name : "fname or lname must contain at least 3 characters "+
    "and lowercase"
};

const usrMidWr = {
    configUserData : (req,res,next)=>{
        let usrBdy = req.body;
        let haveErr = usrIsValid(usrBdy)['error'];
        if(haveErr === null){
            req.body = initUsr(usrBdy);
            next();
        }else{
            let details = haveErr['details'][0];
            let path = details['path'][0];
            if( path == 'password')
                res.json({data: errMsg.password,success:false})
            else if( path == 'fname' || path == 'lname')
                res.json({data:errMsg.name,success:false})   
            else res.json({data:haveErr['details'][0]['message'],success:false});
        }   
    }
};

export default usrMidWr;