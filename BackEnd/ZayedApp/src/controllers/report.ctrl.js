import reportModel from '../models/report.mdl';
import CreateService from '../services/create.service';
import ViewService from '../services/view.service';

const viewService = new ViewService(reportModel);
const createService = new CreateService(reportModel);

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const reportCtrl = {
    create : (req,res)=>{
        createService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        viewService.findAllService()
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default reportCtrl;
