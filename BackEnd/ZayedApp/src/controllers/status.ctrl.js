import statusModel from '../models/status.mdl';
import createService from '../services/create.service';
import {findAllService,findByService} from '../services/view.service';


let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}


export const statusService = {
    getStatusByNum :(status_num)=> findByService(statusModel,{status_num}),
}

const statusCtrl = {
   
    create : (req,res) => {
        createService(statusModel,req.body)
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
