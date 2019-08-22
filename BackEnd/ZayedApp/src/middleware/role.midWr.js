const roleMidWr = {
    configRoleData : (req,res,next)=>{
        let roleBdy = req.body;
        if(!roleBdy['role_name'] || !roleBdy['role_name'].length)
            res.json({data:'role_name is required please define it',success:false});
        else {req.body = roleBdy; next();}
    }
};

export default roleMidWr;