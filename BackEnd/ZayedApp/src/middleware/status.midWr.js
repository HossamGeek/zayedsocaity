import {Joi} from '../../config/imports.config';


const statusSchemaValidation = {
    status_name: Joi.string().min(3).max(30).required(),
    status_num: Joi.number().required(),
};

const statusSchema = Joi.object().keys(statusSchemaValidation);
const statusIsValid = statusData => Joi.validate(statusData, statusSchema);

const initStatus= (statusBdy) => {
    statusBdy['status_name'] =  statusBdy['status_name'].toLowerCase();
    return statusBdy;    
};


const statusMidWr = {
    configStatusData : (req,res,next)=>{
        let statusBdy = req.body;
        let haveErr = statusIsValid(statusBdy)['error'];
        if(haveErr){
            let msgErr = haveErr['details'][0]['message'];
            return res.json({data:msgErr,success:false});
        }
        req.body = initStatus(statusBdy);
        next();
        
    }
};

export default statusMidWr;