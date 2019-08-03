import {Joi,generateCode,uniqId} from '../../../config/imports.config';

let auth ;
let searchKeys = new Set(['id','location_id','issue_num','user_id']);

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

const searchValidator = (searchKey,searchValue)=>{
        return  searchValue ? searchValue :{data:searchKey+' is not define',err:true }    
}
const customSearch = (headers) => {
    let searchData ={};
    Object.keys(headers).map(k=>{
        if(searchKeys.has(k))
            searchData = Object.assign(searchData,{[k]:headers[k]})
    });
    return searchData;
}

const issueMidWr = {
    configIssueData : (req,res,next)=>{
        auth = req.session['authorization'];
        let issueBdy = req.body;
        let haveErr = issueIsValid(issueBdy)['error'];
        if(haveErr === null){
            let msgErr = haveErr['details'][0]['message'];
            return res.json({data:msgErr,success:false});
        }
        req.body = initIssue(issueBdy);
        next();
    },
    userSearch:(req,res,next)=>{
        auth = req.session['authorization'];
        let headrs = customSearch(req.headers);
        headrs['user_id'] = headrs['user_id'] ? headrs['user_id'] : auth['id'];          
        req.headers = headrs;
        next();
    },
    customSearch:(req,res,next)=>{
        let searchKey = req.path.split('/')[1];
        let headrs = customSearch(req.headers)
            ,searchId = searchValidator(searchKey,headrs[searchKey]);   
        if(searchId.err) return res.json(searchId);
        req.headers = headrs;
        next();
    },
   

};

export default issueMidWr;


