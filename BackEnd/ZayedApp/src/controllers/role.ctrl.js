import roleModel from '../models/role.mdl';
import createService from '../services/create.service';
import findAllService from '../services/view.service';

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const roleCtrl = {
    create : (req,res)=>{
        createService(roleModel,req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        findAllService(roleModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default roleCtrl;
