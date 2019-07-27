import locationModel from '../models/location.mdl';
import createService from '../services/create.service';
import findAllService from '../services/view.service';

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const locationCtrl = {
    create : (req,res)=>{
        createService(locationModel,req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        findAllService(locationModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default locationCtrl;
