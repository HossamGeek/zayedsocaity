import reportModel from '../models/report.mdl';
import createService from '../services/create.service';
import findAllService from '../services/view.service';

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const reportCtrl = {
    create : (req,res)=>{
        createService(reportModel,req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        findAllService(reportModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default reportCtrl;
