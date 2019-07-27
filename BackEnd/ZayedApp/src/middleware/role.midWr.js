import {uniqId} from '../../config/imports.config';
const roleMidWr = {
    configRoleData : (req,res,next)=>{
        let roleBdy = req.body;
        roleBdy['id'] = uniqId('role%');
        if(!roleBdy['role_name'] || !roleBdy['role_name'].length)
            res.json({data:'role_name is required please define it',success:false});
        else {req.body = roleBdy; next();}
    }
};

export default roleMidWr;