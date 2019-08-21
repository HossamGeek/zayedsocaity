import locationModel from '../models/location.mdl';
import CreateService from '../services/create.service';
import ViewService from '../services/view.service';

const viewService = new ViewService(locationModel);
const createService = new CreateService(locationModel);

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}
const locationCtrl = {
    create : (req,res)=>{
        createService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        viewService.findAll()
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default locationCtrl;
