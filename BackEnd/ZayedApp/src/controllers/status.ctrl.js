import statusModel from '../models/status.mdl';
import createService from '../services/create.service';
import {findAllService} from '../services/view.service';


let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const statusCtrl = {
    newStatus: bdy => createService(statusModel,bdy),
    create : (req,res) => {
        statusCtrl.newStatus(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        findAllService(statusModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default statusCtrl;
