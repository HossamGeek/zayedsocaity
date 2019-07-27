import {uniqId} from '../../config/imports.config';
const locationMidWr = {
    configLocationData : (req,res,next)=>{
        let locationBdy = req.body;
        locationBdy['id'] = uniqId('location@');
        if(!locationBdy['location_name'] || !locationBdy['location_name'].length)
            res.json({data:'location_name is required please define it',success:false});
        else {req.body = locationBdy; next();}
    }
};

export default locationMidWr;