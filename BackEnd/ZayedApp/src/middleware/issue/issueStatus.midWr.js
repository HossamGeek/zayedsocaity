import {Joi} from '../../../config/imports.config';

const issueStatusSchemaValidation = {
    status_id: Joi.string().required(),
    user_id: Joi.string().required(),
    status_id: Joi.string().required(),
    description: Joi.string().replace(/[<>]/g, ""),
    files:Joi.array()
};
const issueStatusSchema = Joi.object().keys(issueStatusSchemaValidation);
const issueStatusIsValid = issueData => Joi.validate(issueData, issueStatusSchema);


let auth ;

const issueStatusMidWr = {
    checkHeadersIsValid : (req,res,next)=>{
        auth = req.session['authorization'];
        let issue_id = req.headers['issue_id'];
        let status_id = req.headers['status_id'];
        let user_id = req.headers['user_id']?req.headers['user_id']:auth['id'];
        if(!issue_id || !status_id) return res.json({data:'issue_id or status_id not define',success:false});
        req.headers = {status_id,issue_id,user_id};
        next();
    },
    checkIssueStatusBody:(req,res,next)=>{
        auth = req.session['authorization'];
        let statusBdy = req.body;
        statusBdy['user_id'] = auth['id'];
        let haveErr = issueStatusIsValid(statusBdy)['error'];
        if(haveErr){
            let msgErr = haveErr['details'][0]['message'];
            return res.json({data:msgErr,success:false});
        }
        req.body = (issueBdy);
        next();
    }
}

export default issueStatusMidWr;