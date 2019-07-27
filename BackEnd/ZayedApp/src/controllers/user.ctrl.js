import userModel from '../models/user.mdl';
import createService from '../services/create.service';
import findAllService from '../services/view.service';

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const usrCtrl = {
    create : (req,res)=>{
        createService(userModel,req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        findAllService(userModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default usrCtrl;
