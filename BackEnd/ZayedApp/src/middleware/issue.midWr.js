import {Joi,generateCode,uniqId} from '../../config/imports.config';

let auth ;

const issueSchemaValidation = {
    issue_name: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().replace(/[<>]/g, ""),
    address: Joi.string().replace(/[<>]/g, ""),
    location_id: Joi.string().required(),
};
const issueSchema = Joi.object().keys(issueSchemaValidation);
const issueIsValid = issueData => Joi.validate(issueData, issueSchema);

const initIssue = issueData => {
    issueData['issue_name'] =  issueData['issue_name'].toLowerCase();
    issueData['issue_num'] = generateCode();
    issueData['id'] = uniqId('issue!#');
    issueData['user_id'] = auth['id'];
    auth = {};
    return issueData;
};


const issueMidWr = {
    configIssueData : (req,res,next)=>{
        auth = req.session['authorization'];
        let issueBdy = req.body;
        let haveErr = issueIsValid(issueBdy)['error'];
        if(haveErr === null){
            req.body = initIssue(issueBdy);
            next();
        }else{
            let msgErr = haveErr['details'][0]['message'];
            res.json({data:msgErr,success:false});
        }   
    }
};

export default issueMidWr;

