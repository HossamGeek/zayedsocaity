import {uniqId} from '../../config/imports.config';
const statusMidWr = {
    configStatusData : (req,res,next)=>{
        let statusBdy = req.body;
        statusBdy['id'] = uniqId('status#$');
        if(!statusBdy['status_name'] || !statusBdy['status_name'].length)
            res.json({data:'status_name is required please define it',success:false});
        else if(!statusBdy['status_num'] || !statusBdy['status_num'].length)
            res.json({data:'status_num is required please define it',success:false});
        else {req.body = statusBdy; next();}
    }
};

export default statusMidWr;