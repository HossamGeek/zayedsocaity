import {Joi,generateCode} from '../../../config/imports.config';

let auth ;
let searchKeys = new Set(['id','location_id','issue_num','user_id']);

const issueSchemaValidation = {
    issue_name: Joi.string().min(3).max(30).required(),
    description: Joi.string().replace(/[<>]/g, ""),
    address: Joi.string().replace(/[<>]/g, ""),
    location_id: Joi.string().required(),
    files:Joi.array()
};
const issueSchema = Joi.object().keys(issueSchemaValidation);
const issueIsValid = issueData => Joi.validate(issueData, issueSchema);

const initIssue = issueData => {
    issueData['issue_name'] =  issueData['issue_name'].toLowerCase();
    issueData['issue_num'] = generateCode();
    issueData['user_id'] = auth['id'];
    auth = {};
    return issueData;
};

const searchValidator = (searchKey,searchValue)=>{
        return  searchValue && searchValue.length  ?
         searchValue :{data:searchKey+' is not define plz put it in headers',err:true }    
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
    //?? validation issue data before create
    configIssueData : (req,res,next)=>{
        auth = req.session['authorization'];
        let issueBdy = req.body;
        let haveErr = issueIsValid(issueBdy)['error'];
        if(haveErr){
            let msgErr = haveErr['details'][0]['message'];
            return res.json({data:msgErr,success:false});
        }
        req.body = initIssue(issueBdy);
        next();
    },
    userSearch:(req,res,next)=>{
        auth = req.session['authorization'];
        let headers = customSearch(req.headers);
        headers['user_id'] = headers['user_id'] ? headers['user_id'] : auth['id'];          
        req.headers = headers;
        next();
    },
    customSearch:(req,res,next)=>{
        let searchKey = req.path.split('/')[1]; //! path => /locationId >> searchKey = locationId
        let headers = customSearch(req.headers)
            ,searchId = searchValidator(searchKey,headers[searchKey]);   
        if(searchId.err) return res.json(searchId);
        req.headers = headers;
        next();
    },
    issueLikeData: (req,res,next)=>{
        auth = req.session['authorization'];
        let issue_id = searchValidator('issue_id',req.headers['issue_id']);
        if(issue_id.err)return res.json({data:issue_id.data,success:false})
        req.headers = {user_id:auth['id'],issue_id};
        next();
    },
    issueReportData : (req,res,next)=>{
        auth = req.session['authorization'];
        let report_id = searchValidator('report_id',req.headers['report_id']);
        if(report_id.err)return res.json({data:report_id.data,success:false})
        req.headers = {user_id:auth['id'],report_id };
        next();
    },
    issueDisLikeData: (req,res,next)=>{
        auth = req.session['authorization'];
        let issue_id = searchValidator('issue_id',req.headers['issue_id']);
        let report_id = searchValidator('report_id',req.headers['report_id']);
        if(issue_id.err)return res.json({data:issue_id.data,success:false})
        if(report_id.err)return res.json({data:report_id.data,success:false})
        req.headers = {user_id:auth['id'],issue_id,  report_id    };
        next();
    }


   

};

export default issueMidWr;


