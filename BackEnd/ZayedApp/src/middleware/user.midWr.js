import {mac_address,uniqId} from '../../config/imports.config';

let checkValueOfKeyIsFound = (key,keyName) =>{
    if (!key || !key.length)
     return {data: keyName +' is required please define it',success:false};
    else  return {data: key ,success:true};
}
const usrRequiredKeys = ['username','password','email','location_id','role_id'];
const usrMidWr = {
    configUserData : (req,res,next)=>{
        let usrBdy = req.body;
        let err, errData ;
        usrBdy['id'] = uniqId('usr%@');
        usrBdy['mac_address'] = mac_address();
        usrRequiredKeys.map(usr=>{
                let keyIsFound = checkValueOfKeyIsFound(usrBdy[usr],usr);
                if(keyIsFound.success) usrBdy[usr] = keyIsFound.data;
                else {err = true;errData = keyIsFound;}    
        });
        if (err) res.json(errData);
        else {req.body = usrBdy; next();}
            
    }
};

export default usrMidWr;